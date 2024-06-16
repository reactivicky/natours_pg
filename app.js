import { config } from 'dotenv';
config();
import express from 'express';
import { validationResult } from 'express-validator';
import { rateLimit } from 'express-rate-limit';
import createConnection from './createConnection.js';
import {
  getAllToursQuery,
  getTourQuery,
  insertTour,
  insertStartDatesQuery,
  insertTourImagesQuery,
  deleteTourQuery,
} from './queries/tours.js';
import createTourValidation from './validations/createTour.js';
import tourIdValidation from './validations/getTour.js';
import updateTourValidation from './validations/updateTour.js';

const app = express();
const client = createConnection();

// Middleware to parse JSON bodies, limited to 10KB
app.use(express.json({ limit: '10kb' }));
// Middleware to parse URL-encoded bodies, limited to 10KB
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.get('/api/v1/tours', limiter, async (req, res) => {
  try {
    const toursRes = await client.query(getAllToursQuery);
    const tours = toursRes.rows;
    res.status(200).json({
      status: 'success',
      results: toursRes.rowCount,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
});

app.get('/api/v1/tours/:id', limiter, tourIdValidation(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'failed', errors: errors.array() });
  }
  // If validation passed, proceed with the request handling
  const tourId = req.params.id;
  // Fetch and return tour data by ID
  try {
    const tourRes = await client.query(getTourQuery, [tourId]);
    if (tourRes.rowCount !== 0) {
      res.status(200).json({
        status: 'success',
        data: {
          tour: tourRes.rows,
        },
      });
    } else {
      res.status(404).json({
        status: 'failed',
        message: `Tour with id ${tourId} does not exist`,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
});

app.post('/api/v1/tours', limiter, createTourValidation(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'failed', errors: errors.array() });
  }

  const {
    name,
    duration,
    maxGroupSize,
    difficulty,
    price,
    summary,
    description,
    imageCover,
    startDates,
    images,
  } = req.body;

  try {
    const clientPool = await client.connect();

    try {
      await clientPool.query('BEGIN');
      const tourResponse = await client.query(insertTour, [
        name,
        duration,
        maxGroupSize,
        difficulty,
        price,
        summary,
        description,
        imageCover,
      ]);
      const tour = tourResponse.rows[0];

      const generateInsertStartDatesQuery = insertStartDatesQuery(startDates);
      const insertedDates = await clientPool.query(
        generateInsertStartDatesQuery,
        [tour.id, ...startDates]
      );
      const insertedDatesArray = insertedDates.rows.map(
        (row) => row.start_date
      );
      const generateInsertTourImagesQuery = insertTourImagesQuery(images);
      const insertedImages = await clientPool.query(
        generateInsertTourImagesQuery,
        [tour.id, ...images]
      );
      const insertedImagesArray = insertedImages.rows.map((row) => row.image);
      await clientPool.query('COMMIT');
      res.status(201).json({
        status: 'success',
        data: {
          tour: {
            ...tour,
            startDates: insertedDatesArray,
            images: insertedImagesArray,
          },
        },
      });
    } catch (error) {
      await clientPool.query('ROLLBACK');
      res.status(404).json({
        status: 'failed',
        message: error,
      });
    } finally {
      clientPool.release();
    }
  } catch (e) {
    res.status(500).json({
      status: 'failed',
      message: `Internal server error, ${e}`,
    });
  }
});

app.patch(
  '/api/v1/tours/:id',
  limiter,
  [tourIdValidation(), updateTourValidation()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'failed', errors: errors.array() });
    }
    // If validation passed, proceed with the request handling
    const tourId = req.params.id;
    const updates = req.body;

    try {
      const clientPool = await client.connect();
      try {
        await client.query('BEGIN');

        // Build the SET part of the update query dynamically based on the request body
        const setClauses = [];
        const values = [];
        let queryIndex = 1;

        for (let key in updates) {
          if (key !== 'startDates' && key !== 'images') {
            setClauses.push(`${key} = $${queryIndex}`);
            values.push(updates[key]);
            queryIndex++;
          }
        }

        if (setClauses.length > 0) {
          const updateTourQuery = `
          UPDATE tours
          SET ${setClauses.join(', ')}
          WHERE id = $${queryIndex}
          RETURNING *;
        `;
          values.push(tourId);

          const result = await clientPool.query(updateTourQuery, values);

          if (result.rowCount === 0) {
            throw new Error('Tour not found');
          }

          // Update start dates if provided
          if (updates.startDates) {
            await clientPool.query(
              `DELETE FROM tour_dates WHERE tour_id = $1`,
              [tourId]
            );
            const generateInsertStartDatesQuery = insertStartDatesQuery(
              updates.startDates
            );
            await clientPool.query(generateInsertStartDatesQuery, [
              tourId,
              ...updates.startDates,
            ]);
          }

          // Update tour images if provided
          if (updates.images) {
            await clientPool.query(
              `DELETE FROM tour_images WHERE tour_id = $1`,
              [tourId]
            );
            const generateInsertTourImagesQuery = insertTourImagesQuery(
              updates.images
            );
            await clientPool.query(generateInsertTourImagesQuery, [
              tourId,
              ...updates.images,
            ]);
          }

          const updatedTour = await clientPool.query(getTourQuery, [tourId]);

          await clientPool.query('COMMIT');

          res.status(200).json({
            status: 'success',
            data: {
              tour: updatedTour.rows[0],
            },
          });
        }
      } catch (error) {
        await clientPool.query('ROLLBACK');
        res.status(404).json({
          status: 'failed',
          message: error,
        });
      } finally {
        clientPool.release();
      }
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: `Internal server error, ${error}`,
      });
    }
  }
);

app.delete(
  '/api/v1/tours/:id',
  limiter,
  tourIdValidation(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'failed', errors: errors.array() });
    }

    const tourId = req.params.id;

    try {
      const clientPool = await client.connect();

      try {
        await clientPool.query('BEGIN');

        const deletedTour = await client.query(deleteTourQuery, [tourId]);

        if (deletedTour.rowCount === 0) {
          throw new Error('Tour not found');
        }
        await clientPool.query('COMMIT');
        res.status(200).json({
          status: 'success',
          data: {
            deletedTour: deletedTour.rows[0],
          },
        });
      } catch (error) {
        await clientPool.query('ROLLBACK');
        res.status(404).json({
          status: 'failed',
          message: error,
        });
      } finally {
        clientPool.release();
      }
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: `Internal server error, ${error}`,
      });
    }
  }
);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await client.connect();
    console.log('Connected to db...');
    console.log(`App listening on port ${port}...`);
  } catch (error) {
    console.error('Could not connect to db!', error);
  }
});

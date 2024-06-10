import { config } from 'dotenv';
config();
import express from 'express';
import { param, validationResult, body } from 'express-validator';
import { rateLimit } from 'express-rate-limit';
import createConnection from './createConnection.js';
import { getAllToursQuery, getTourQuery, insertTour } from './queries/tours.js';

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

app.get(
  '/api/v1/tours/:id',
  limiter,
  param('id').isNumeric().withMessage('id must be numeric').trim().escape(),
  async (req, res) => {
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
  }
);

app.post(
  '/api/v1/tours',
  limiter,
  [
    // Validate request body fields using express-validator
    body('name')
      .isString({ max: 255 })
      .withMessage('name should be string')
      .notEmpty()
      .withMessage('Name is required')
      .trim()
      .escape(),
    body('duration')
      .notEmpty()
      .withMessage('duration is required')
      .isInt({ min: 1 })
      .withMessage('duration must be a positive integer'),
    body('maxGroupSize')
      .notEmpty()
      .withMessage('maxGroupSize is required')
      .isInt({ min: 1 })
      .withMessage('maxGroupSize must be a positive integer'),
    body('difficulty')
      .notEmpty()
      .withMessage('difficulty is required')
      .isIn(['easy', 'medium', 'difficult'])
      .withMessage('difficulty must be easy, medium, or difficult'),
    body('price')
      .notEmpty()
      .withMessage('price is required')
      .isFloat({ min: 0 })
      .withMessage('price must be a positive number'),
    body('summary')
      .notEmpty()
      .withMessage('summary is required')
      .isString({ max: 255 })
      .withMessage('summary should be string')
      .trim()
      .escape(),
    body('description')
      .notEmpty()
      .withMessage('description is required')
      .isString({ max: 1000 })
      .withMessage('description should be string')
      .trim()
      .escape(),
    body('imageCover')
      .isString({ max: 255 })
      .withMessage('imageCover should be string')
      .trim()
      .escape(),
    body('startDates').isArray().withMessage('Start dates must be an array'),
    body('startDates.*').isISO8601().withMessage('Invalid start date format'),
    body('tourImages').isArray().withMessage('Tour images must be an array'),
    body('tourImages.*').isURL().withMessage('Invalid image URL'),
  ],
  async (req, res) => {
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
      tourImages,
    } = req.body;

    console.log({
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      imageCover,
      startDates,
      tourImages,
    });

    // try {
    //   const tourRes = await client.query(insertTour, []);
    // } catch (error) {}
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

import isNumeric from 'validator/lib/isNumeric.js';
import {
  getAllToursQuery,
  getTourQuery,
  createTourQuery,
  insertStartDatesQuery,
  insertTourImagesQuery,
  deleteTourQuery,
  updateTourQuery,
  checkTourQuery,
} from '../models/tours.js';

// export const checkTourId = async (req, res, next, val) => {
//   if (!isNumeric(val)) {
//     return res.status(400).json({
//       status: 'failed',
//       message: `id must be numeric`,
//     });
//   }
//   // Checking for tour id, primary keys are always indexed, so this will not be performance hit
//   const tourRes = await pg(checkTourQuery, [val]);
//   if (tourRes.rowCount === 0) {
//     return res.status(404).json({
//       status: 'failed',
//       message: `Tour with id ${val} does not exist`,
//     });
//   }
//   next();
// };

export const getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]);

    const tours = await getAllToursQuery();
    res.status(200).json({
      status: 'success',
      results: tours.length,
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
};

// export const getTour = async (req, res) => {
//   const tourId = req.params.id;
//   // Fetch and return tour data by ID
//   try {
//     const tourRes = await pg(getTourQuery, [tourId]);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour: tourRes.rows[0],
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: 'failed',
//       message: error,
//     });
//   }
// };

// export const createTour = async (req, res) => {
//   const {
//     name,
//     duration,
//     maxGroupSize,
//     difficulty,
//     price,
//     summary,
//     description,
//     imageCover,
//     startDates,
//     images,
//   } = req.body;

//   try {
//     const clientPool = await connect();

//     try {
//       await clientPool.query('BEGIN');
//       const tourResponse = await clientPool.query(createTourQuery, [
//         name,
//         duration,
//         maxGroupSize,
//         difficulty,
//         price,
//         summary,
//         description,
//         imageCover,
//       ]);
//       const tour = tourResponse.rows[0];

//       const generateInsertStartDatesQuery = insertStartDatesQuery(startDates);
//       const insertedDates = await clientPool.query(
//         generateInsertStartDatesQuery,
//         [tour.id, ...startDates]
//       );
//       const insertedDatesArray = insertedDates.rows.map(
//         (row) => row.start_date
//       );
//       const generateInsertTourImagesQuery = insertTourImagesQuery(images);
//       const insertedImages = await clientPool.query(
//         generateInsertTourImagesQuery,
//         [tour.id, ...images]
//       );
//       const insertedImagesArray = insertedImages.rows.map((row) => row.image);
//       await clientPool.query('COMMIT');
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: {
//             ...tour,
//             startDates: insertedDatesArray,
//             images: insertedImagesArray,
//           },
//         },
//       });
//     } catch (error) {
//       await clientPool.query('ROLLBACK');
//       res.status(404).json({
//         status: 'failed',
//         message: error,
//       });
//     } finally {
//       clientPool.release();
//     }
//   } catch (e) {
//     res.status(500).json({
//       status: 'failed',
//       message: `Internal server error, ${e}`,
//     });
//   }
// };

// export const updateTour = async (req, res) => {
//   const tourId = req.params.id;
//   const updates = req.body;

//   try {
//     const clientPool = await connect();
//     try {
//       await query('BEGIN');

//       // Build the SET part of the update query dynamically based on the request body
//       const setClauses = [];
//       const values = [];
//       let queryIndex = 1;

//       for (let key in updates) {
//         if (key !== 'startDates' && key !== 'images') {
//           setClauses.push(`${key} = $${queryIndex}`);
//           values.push(updates[key]);
//           queryIndex++;
//         }
//       }

//       if (setClauses.length > 0) {
//         values.push(tourId);

//         await clientPool.query(updateTourQuery(setClauses, queryIndex), values);

//         // Update start dates if provided
//         if (updates.startDates) {
//           await clientPool.query(`DELETE FROM tour_dates WHERE tour_id = $1`, [
//             tourId,
//           ]);
//           const generateInsertStartDatesQuery = insertStartDatesQuery(
//             updates.startDates
//           );
//           await clientPool.query(generateInsertStartDatesQuery, [
//             tourId,
//             ...updates.startDates,
//           ]);
//         }

//         // Update tour images if provided
//         if (updates.images) {
//           await clientPool.query(`DELETE FROM tour_images WHERE tour_id = $1`, [
//             tourId,
//           ]);
//           const generateInsertTourImagesQuery = insertTourImagesQuery(
//             updates.images
//           );
//           await clientPool.query(generateInsertTourImagesQuery, [
//             tourId,
//             ...updates.images,
//           ]);
//         }

//         const updatedTour = await clientPool.query(getTourQuery, [tourId]);

//         await clientPool.query('COMMIT');

//         res.status(200).json({
//           status: 'success',
//           data: {
//             tour: updatedTour.rows[0],
//           },
//         });
//       }
//     } catch (error) {
//       await clientPool.query('ROLLBACK');
//       res.status(404).json({
//         status: 'failed',
//         message: error,
//       });
//     } finally {
//       clientPool.release();
//     }
//   } catch (error) {
//     res.status(500).json({
//       status: 'failed',
//       message: `Internal server error, ${error}`,
//     });
//   }
// };

// export const deleteTour = async (req, res) => {
//   const tourId = req.params.id;
//   try {
//     const deletedTour = await query(deleteTourQuery, [tourId]);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         deletedTour: deletedTour.rows[0],
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: 'failed',
//       message: error,
//     });
//   }
// };

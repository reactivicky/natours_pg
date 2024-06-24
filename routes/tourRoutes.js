import { Router } from 'express';
import createTourValidation from '../validations/createTour.js';
import updateTourValidation from '../validations/updateTour.js';
import idValidation from '../validations/id.js';
import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
} from '../controllers/tourController.js';

const router = Router();

router.route('/').get(getAllTours).post(createTourValidation(), createTour);

router
  .route('/:id')
  .get(idValidation(), getTour)
  .patch([idValidation(), updateTourValidation()], updateTour)
  .delete(idValidation(), deleteTour);

export default router;

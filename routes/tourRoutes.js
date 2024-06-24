import { Router } from 'express';
import createTourValidation from '../validations/createTour.js';
import updateTourValidation from '../validations/updateTour.js';
import {
  checkTourId,
  validateErrors,
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
} from '../controllers/tourController.js';

const router = Router();

router.param('id', checkTourId);
router
  .route('/')
  .get(getAllTours)
  .post(createTourValidation(), validateErrors, createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTourValidation(), validateErrors, updateTour)
  .delete(deleteTour);

export default router;

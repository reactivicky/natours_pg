import { param } from 'express-validator';

const getTourValidation = () =>
  param('id').isNumeric().withMessage('id must be numeric').trim().escape();

export default getTourValidation;

import { param } from 'express-validator';

const tourIdValidation = () =>
  param('id').isNumeric().withMessage('id must be numeric').trim().escape();

export default tourIdValidation;

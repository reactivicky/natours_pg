import { param } from 'express-validator';

const idValidation = () =>
  param('id').isNumeric().withMessage('id must be numeric').trim().escape();

export default idValidation;

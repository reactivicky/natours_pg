import { body } from 'express-validator';

const createTourValidation = () => [
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
];

export default createTourValidation;

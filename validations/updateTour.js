import { body } from 'express-validator';

const updateTourValidation = () => [
  // Validate request body fields using express-validator
  body('name')
    .optional()
    .isString({ max: 255 })
    .withMessage('name should be string')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .escape(),
  body('duration')
    .optional()
    .notEmpty()
    .withMessage('duration is required')
    .isInt({ min: 1 })
    .withMessage('duration must be a positive integer'),
  body('maxGroupSize')
    .optional()
    .notEmpty()
    .withMessage('maxGroupSize is required')
    .isInt({ min: 1 })
    .withMessage('maxGroupSize must be a positive integer'),
  body('difficulty')
    .optional()
    .notEmpty()
    .withMessage('difficulty is required')
    .isIn(['easy', 'medium', 'difficult'])
    .withMessage('difficulty must be easy, medium, or difficult'),
  body('price')
    .optional()
    .notEmpty()
    .withMessage('price is required')
    .isFloat({ min: 0 })
    .withMessage('price must be a positive number'),
  body('summary')
    .optional()
    .notEmpty()
    .withMessage('summary is required')
    .isString({ max: 255 })
    .withMessage('summary should be string')
    .trim()
    .escape(),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('description is required')
    .isString({ max: 1000 })
    .withMessage('description should be string')
    .trim()
    .escape(),
  body('imageCover')
    .optional()
    .isString({ max: 255 })
    .withMessage('imageCover should be string')
    .trim()
    .escape(),
  body('startDates')
    .optional()
    .isArray()
    .withMessage('Start dates must be an array'),
  body('startDates.*')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2},\d{2}:\d{2}$/)
    .withMessage('Date must be in the format YYYY-MM-DD,HH:MM')
    .custom((value) => {
      const [date, time] = value.split(',');
      const isValidDate = (date) => {
        const [year, month, day] = date.split('-').map(Number);
        const dateObject = new Date(year, month - 1, day);
        return (
          dateObject.getFullYear() === year &&
          dateObject.getMonth() === month - 1 &&
          dateObject.getDate() === day
        );
      };
      const isValidTime = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        return hour >= 0 && hour < 24 && minute >= 0 && minute < 60;
      };

      if (!isValidDate(date)) {
        throw new Error('Invalid date');
      }
      if (!isValidTime(time)) {
        throw new Error('Invalid time');
      }
      return true;
    }),
  body('images')
    .optional()
    .isArray()
    .withMessage('Tour images must be an array'),
  body('images.*').optional().isURL().withMessage('Invalid image URL'),
];

export default updateTourValidation;

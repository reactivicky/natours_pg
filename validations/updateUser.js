import { body } from 'express-validator';

const updateUserValidation = () => [
  // Validate request body fields using express-validator
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Name is required')
    .isString({ max: 255 })
    .withMessage('name should be string')
    .trim()
    .escape(),
  body('email')
    .optional()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .trim()
    .escape(),
  body('role')
    .optional()
    .notEmpty()
    .withMessage('difficulty is required')
    .isIn(['admin', 'user', 'guide'])
    .withMessage('role must be admin, user, or guide'),
  body('active')
    .optional()
    .notEmpty()
    .withMessage('active is required')
    .isBoolean()
    .withMessage('active must be boolean'),
  body('photo')
    .optional()
    .isString({ max: 255 })
    .withMessage('photo should be string')
    .trim()
    .escape(),
  body('password')
    .optional()
    .notEmpty()
    .withMessage('active is required')
    .isString({ max: 255 })
    .withMessage('password should be string')
    .trim()
    .escape(),
];

export default updateUserValidation;

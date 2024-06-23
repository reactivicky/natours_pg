import { body } from 'express-validator';

const createUserValidation = () => [
  // Validate request body fields using express-validator
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString({ max: 255 })
    .withMessage('name should be string')
    .trim()
    .escape(),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .trim()
    .escape(),
  body('role')
    .notEmpty()
    .withMessage('difficulty is required')
    .isIn(['admin', 'user', 'guide'])
    .withMessage('role must be admin, user, or guide'),
  body('active')
    .notEmpty()
    .withMessage('active is required')
    .isBoolean()
    .withMessage('active must be boolean'),
  body('photo')
    .isString({ max: 255 })
    .withMessage('photo should be string')
    .trim()
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('active is required')
    .isString({ max: 255 })
    .withMessage('password should be string')
    .trim()
    .escape(),
];

export default createUserValidation;

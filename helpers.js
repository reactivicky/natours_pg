import { validationResult } from 'express-validator';

export const validateErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'failed', errors: errors.array() });
  }
  next();
};

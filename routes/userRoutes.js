import { Router } from 'express';
import { validateErrors } from '../helpers.js';
import createUserValidation from '../validations/createUser.js';
import updateUserValidation from '../validations/updateUser.js';
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  checkUserId,
} from '../controllers/userController.js';

const router = Router();

router.param('id', checkUserId);
router
  .route('/')
  .get(getAllUsers)
  .post(createUserValidation(), validateErrors, createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUserValidation(), validateErrors, updateUser)
  .delete(deleteUser);

export default router;

import { Router } from 'express';
import idValidation from '../validations/id.js';
import createUserValidation from '../validations/createUser.js';
import updateUserValidation from '../validations/updateUser.js';
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/userController.js';

const router = Router();

router.route('/').get(getAllUsers).post(createUserValidation(), createUser);
router
  .route('/:id')
  .get(idValidation(), getUser)
  .patch([idValidation(), updateUserValidation()], updateUser)
  .delete(idValidation(), deleteUser);

export default router;

import { Router } from 'express';
import createUserValidation from '../validations/createUser.js';
import updateUserValidation from '../validations/updateUser.js';
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/userController.js';
import { checkId } from '../controllers/userController.js';

const router = Router();

router.param('id', checkId);

router.route('/').get(getAllUsers).post(createUserValidation(), createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUserValidation(), updateUser)
  .delete(deleteUser);

export default router;

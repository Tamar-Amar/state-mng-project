import express from 'express';
import {
    createUserController,
    getUserByIdController,
    getAllUsersController,
    updateUserController,
    deleteUserController
} from '../controllers/userController';
import { authAndPermissionMiddleware } from '../middlewares/authAndPermissionMiddleware';
import upload from '../middlewares/uploadMiddleware';

const router = express.Router();

router.post('/register', upload.single('profilePicture'), createUserController);
router.get('/', authAndPermissionMiddleware('admin'), getAllUsersController);
router.get('/:id', authAndPermissionMiddleware(), getUserByIdController);
router.put('/:id', authAndPermissionMiddleware(undefined, 'canUpdate'), updateUserController);
router.delete('/:id', authAndPermissionMiddleware(undefined, 'canDelete'), deleteUserController);

export default router;

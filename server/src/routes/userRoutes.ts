import express from 'express';
import {
    createUserController,
    getUserByIdController,
    getAllUsersController,
    updateUserController,
    deleteUserController
} from '../controllers/userController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';
import upload from 'middlewares/uploadMiddleware';

const router = express.Router();

router.post('/register', upload.single('profilePicture'), createUserController);
router.get('/', adminMiddleware, getAllUsersController);
router.get('/:id', authMiddleware, getUserByIdController);
router.put('/:id', authMiddleware, updateUserController);
router.delete('/:id', adminMiddleware, deleteUserController);


export default router;

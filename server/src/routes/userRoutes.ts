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
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

const registerMiddleware = process.env.NODE_ENV === 'test'
  ? ((req: Request, res: Response, next: NextFunction) => { next(); })
  : upload.single('profilePicture');;

router.post('/register',registerMiddleware, createUserController);
router.get('/', authAndPermissionMiddleware('admin'), getAllUsersController);
router.get('/:id', authAndPermissionMiddleware(), getUserByIdController);
router.put('/:id', authAndPermissionMiddleware(undefined, 'canUpdate'), updateUserController);
router.delete('/:id', authAndPermissionMiddleware(undefined, 'canDelete'), deleteUserController);


export default router;

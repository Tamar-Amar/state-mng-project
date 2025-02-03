import express from 'express';
import {
    setUserPermissionsController,
    getUserPermissionsController,
    deleteUserPermissionsController
} from '../controllers/permissionController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.put('/:userId', adminMiddleware, setUserPermissionsController);
router.get('/:userId', authMiddleware, getUserPermissionsController);
router.delete('/:userId', adminMiddleware, deleteUserPermissionsController);

export default router;

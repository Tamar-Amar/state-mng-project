import express from 'express';
import {
    requestPermissionController,
    getPendingRequestsController,
    getRequestByIdController,
    approvePermissionRequestController,
    denyPermissionRequestController,
    getUserPermissionRequestsController
} from '../controllers/permissionRequestController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// משתמש מבקש הרשאה חדשה
router.post('/', authMiddleware, requestPermissionController);

// מנהל מקבל את כל הבקשות הממתינות
router.get('/', adminMiddleware, getPendingRequestsController);

// שליפת בקשה ספציפית לפי ID
router.get('/:id', adminMiddleware, getRequestByIdController);

// מנהל מאשר בקשה מסוימת
router.patch('/:id/approve', adminMiddleware, approvePermissionRequestController);

// מנהל דוחה בקשה מסוימת
router.patch('/:id/deny', adminMiddleware, denyPermissionRequestController);

router.get('/user/history', authMiddleware, getUserPermissionRequestsController);


export default router;

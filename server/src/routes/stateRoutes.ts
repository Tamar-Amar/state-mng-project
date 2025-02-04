import express from 'express';
import {
    createState,
    getAllStates,
    getStateById,
    updateState,
    deleteState,
    restoreState,
} from '../controllers/stateController';
import { authAndPermissionMiddleware } from '../middlewares/authAndPermissionMiddleware';

const router = express.Router();

router.post('/', authAndPermissionMiddleware(undefined, 'canAdd'), createState);
router.get('/', authAndPermissionMiddleware(), getAllStates);
router.get('/:id', authAndPermissionMiddleware(), getStateById);
router.put('/:id', authAndPermissionMiddleware(undefined, 'canUpdate'), updateState);
router.delete('/:id', authAndPermissionMiddleware(undefined, 'canDelete'), deleteState);
router.patch('/:id/restore', authAndPermissionMiddleware('admin'), restoreState);

export default router;

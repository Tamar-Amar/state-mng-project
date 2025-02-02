import express from 'express';
import {
    createState,
    getAllStates,
    getStateById,
    updateState,
    deleteState,
    restoreState,
} from '../controllers/stateController';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createState);

router.get('/', authMiddleware, getAllStates);

router.get('/:id', authMiddleware, getStateById);

router.put('/:id', authMiddleware, updateState);

router.delete('/:id', authMiddleware, deleteState);

router.patch('/:id/restore', authMiddleware, restoreState); 

export default router;

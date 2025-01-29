import express from 'express';
import {
    createState,
    getAllStates,
    getStateById,
    updateState,
    deleteState,
    restoreState,
} from '../controllers/stateController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

//create state
router.post('/', authMiddleware, createState);

//get all states
router.get('/', authMiddleware, getAllStates);

//get state by id
router.get('/:id', authMiddleware, getStateById);

//update state by id
router.put('/:id', authMiddleware, updateState);

//delete state by id
router.delete('/:id', authMiddleware, deleteState);
// Restore state by ID
router.patch('/:id/restore', authMiddleware, restoreState); 

export default router;

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

//create state
router.post('/', adminMiddleware, createState);

//get all states
router.get('/', adminMiddleware, getAllStates);

//get state by id
router.get('/:id', adminMiddleware, getStateById);

//update state by id
router.put('/:id', adminMiddleware, updateState);

//delete state by id
router.delete('/:id', adminMiddleware, deleteState);
// Restore state by ID
router.patch('/:id/restore', adminMiddleware, restoreState); 

export default router;

import { Request, Response, NextFunction } from 'express';
import {
    getAllStatesService,
    getStateByIdService,
    createStateService,
    updateStateService,
    deleteStateService,
} from '../services/stateService';

export const getAllStates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const states = await getAllStatesService();
        res.status(200).json(states);
    } catch (error) {
        next(error);
    }
};

export const getStateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const state = await getStateByIdService(req.params.id);
        if (!state) {
            res.status(404).json({ message: 'State not found' });
            return ;
        }
        res.status(200).json(state);
    } catch (error) {
        next(error);
    }
};

export const createState = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
        const result = await createStateService(req.body);

        if (result.exists) {
            if (result.isDeleted) {
                res.status(200).json({
                    message: 'State already exists but is deleted. Would you like to restore it?',
                    state: result.state,
                });
                return ;
            }
            res.status(400).json({ message: 'State already exists.', state: result.state });
            return ;
        }

        res.status(201).json(result.state);
    } catch (error) {
        next(error);
    }
};


export const updateState = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedState = await updateStateService(req.params.id, req.body);
        if (!updatedState) {
            res.status(404).json({ message: 'State not found' });
            return ;
        }
        res.status(200).json(updatedState);
    } catch (error) {
        next(error);
    }
};

export const deleteState = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedState = await deleteStateService(req.params.id);
        if (!deletedState) {
             res.status(404).json({ message: 'State not found' });
             return;
        }
        res.status(200).json({ message: 'State deleted successfully' });
    } catch (error) {
        next(error);
    }
};


import State from '../models/State';

export const restoreState = async (req: Request, res: Response, next: NextFunction) => {
    console.log("----------",req.params.id);
    try {
        const state = await State.findByIdAndUpdate(
            req.params.id,
            { isActive: true },
            { new: true }
        );

        if (!state) {
            res.status(404).json({ message: 'State not found' });
            return ;
        }

        res.status(200).json({ message: 'State restored successfully', state });
    } catch (error) {
        next(error); 
    }
};

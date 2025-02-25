import { Request, Response, NextFunction } from 'express';
import { createRegionService, getAllRegionsService } from '../services/regionService';


export const getAllRegion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const regions = await getAllRegionsService();
        res.status(200).json(regions);
    } catch (error) {
        next(error);
    }
};

export const createRegion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newRegion = await createRegionService(req.body);
        res.status(201).json(newRegion);
    } catch (error) {
        if ((error as any).code === 11000) {
            res.status(400).json({ message: 'Region with this name already exists' });
        } else {
            next(error);
        }
    }
};

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
    try{
        const newRegion = await createRegionService(req.body);
        res.status(201).json(newRegion);
    } catch (error) {
        next(error);
    }
}

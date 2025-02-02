import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        next();

};

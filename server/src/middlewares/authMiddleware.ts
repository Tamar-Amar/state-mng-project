import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // try {
    //     if (
    //         process.env.NODE_ENV === 'test' || 
    //         req.path === '/api/states' || 
    //         (req.method === 'GET' && req.path.startsWith('/api/states')) 
    //     ) {
    //         logger.info('Skipping authentication for this request');
    //         return next();
    //     }

    //     const token = req.headers.authorization?.split(' ')[1];

    //     if (!token) {
    //         logger.error('Unauthorized: Token is missing');
    //         res.status(401).json({ message: 'Unauthorized: Token is missing' });
    //         return;
    //     }

        next();
    // } catch (err) {
    //     logger.error('Unauthorized: Invalid token');
    //     res.status(401).json({ message: 'Unauthorized: Invalid token' });
    // }
};

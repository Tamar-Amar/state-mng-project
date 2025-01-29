import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
    logger.error(`${err.message} - ${req.method} ${req.originalUrl} - ${req.ip}`);

    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e: any) => e.message);
        res.status(400).json({
            message: 'Validation Error',
            errors,
        });
        return;
    }

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
    
};

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import logger from '../utils/logger';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            logger.error('Unauthorized: Token is missing');
            res.status(401).json({ message: 'Unauthorized: Token is missing' });
            return;
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        console.log("decoded",decoded);
        const user = await User.findById(decoded.userId).select('-password');
        console.log("user found",user);

        if (!user) {

            logger.error('Unauthorized: User not found');
            res.status(401).json({ message: 'Unauthorized: User not found' });
            return;
        }

        req.user = user; 
        next(); 
    } catch (err) {
        logger.error('Unauthorized: Invalid token');
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};


export const adminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            logger.error('Unauthorized: Token is missing');
            res.status(401).json({ message: 'Unauthorized: Token is missing' });
            return;
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        console.log("decoded",decoded);
        const user = await User.findById(decoded.userId).select('-password');
        console.log("user found",user);

        if (!user) {
            res.status(401).json({ message: 'Unauthorized: No user found' });
            return;
        }

        if (user.role !== 'admin') {
            res.status(403).json({ message: 'Forbidden: Admin access required' });
            return;
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};

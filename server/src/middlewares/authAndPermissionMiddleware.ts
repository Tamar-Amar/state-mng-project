import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import logger from '../utils/logger';

export const authAndPermissionMiddleware = (
    requiredRole?: 'admin' | 'user', requiredPermission?: 'canAdd' | 'canUpdate' | 'canDelete'
) => {

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (process.env.NODE_ENV === 'test') {
            return next();
        }
        
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                logger.error('Unauthorized: Token is missing');
                res.status(401).json({ message: 'Unauthorized: Token is missing' });
                return;
            }
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
            const user = await User.findById(decoded.userId).select('-password');
            if (!user) {
                logger.error('Unauthorized: User not found');
                res.status(401).json({ message: 'Unauthorized: User not found' });
                return;
            }
            if (requiredRole && user.role !== requiredRole) {
                logger.error(`Forbidden: ${requiredRole} role required`);
                res.status(403).json({ message: `Forbidden: ${requiredRole} role required` });
                return;
            }
            if (user.role === 'admin') {
                req.user = user;
                return next();
            }
            if (requiredPermission && !user.permissions[requiredPermission]) {
                logger.error(`Forbidden: Missing permission to ${requiredPermission}`);
                res.status(403).json({ message: `Forbidden: Missing permission to ${requiredPermission}` });
                return;
            }
            req.user = user;
            next();
        } 
        catch (err) 
        {
            logger.error('Unauthorized: Invalid token');
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    };
};

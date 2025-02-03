import { Request, Response } from 'express';
import {
    setUserPermissions,
    getUserPermissions,
    deleteUserPermissions
} from '../services/permissionService';

/**
 * עדכון או הוספת הרשאות למשתמש
 */
export const setUserPermissionsController = async (req: Request, res: Response) => {
    try {
        const permissions = await setUserPermissions(req.params.userId, req.body);
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Error updating permissions', error });
    }
};

/**
 * קבלת הרשאות של משתמש מסוים
 */
export const getUserPermissionsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const permissions = await getUserPermissions(req.params.userId);
        if (!permissions) 
            {res.status(404).json({ message: 'Permissions not found' });
        return ;}
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving permissions', error });
    }
};

/**
 * מחיקת הרשאות של משתמש
 */
export const deleteUserPermissionsController = async (req: Request, res: Response) => {
    try {
        await deleteUserPermissions(req.params.userId);
        res.status(200).json({ message: 'Permissions deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting permissions', error });
    }
};

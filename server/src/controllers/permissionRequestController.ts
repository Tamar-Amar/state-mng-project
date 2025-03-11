import { Request, Response } from 'express';
import {
    requestPermission,
    getPendingRequests,
    getRequestById,
    approvePermissionRequest,
    denyPermissionRequest,
    getUserPermissionRequests,
    getUserPendingRequests
} from '../services/permissionRequestService';
import User from '../models/User';


export const requestPermissionController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id || req.body.user;
        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }
        
        const permissionRequest = await requestPermission(userId, req.body);
        await User.findByIdAndUpdate(userId, {
            $push: { permissionRequests: permissionRequest._id }
        });
        
        res.status(201).json(permissionRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error requesting permission', error });
    }
};


export const getPendingRequestsController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const requests = await getPendingRequests();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving permission requests', error });
    }
};

export const getUserPendingRequestsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests = await getUserPendingRequests(req.params.id);
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving permission requests', error });
    }
};


export const getRequestByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const request = await getRequestById(req.params.id);
        if (!request) {
            res.status(404).json({ message: 'Permission request not found' });
            return;
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving permission request', error });
    }
};


export const approvePermissionRequestController = async (req: Request, res: Response): Promise<void> => {
    try {
        const adminId = req.user?.id || req.body.admin;
        if (!adminId) {
            res.status(401).json({ message: 'Admin not authenticated' });
            return;
        }
        await approvePermissionRequest(req.params.id, adminId, req.body);
        res.status(200).json({ message: 'Permission request approved' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving permission request', error });
    }
};


export const denyPermissionRequestController = async (req: Request, res: Response): Promise<void> => {
    try {
        const adminId = req.user?.id || req.body.admin;
        if (!adminId) {
            res.status(401).json({ message: 'Admin not authenticated' });
            return;
        }
        await denyPermissionRequest(req.params.id,adminId);
        res.status(200).json({ message: 'Permission request denied' });
    } catch (error) {
        res.status(500).json({ message: 'Error denying permission request', error });
    }
};


export const getUserPermissionRequestsController = async (req: Request, res: Response): Promise<void> => {
    try {
      const requests = await getUserPermissionRequests(req.user!.id);
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user permission requests', error });
    }
  };
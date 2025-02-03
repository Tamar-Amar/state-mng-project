import mongoose from 'mongoose';
import PermissionRequest from '../models/PermissionRequest';
import { setUserPermissions } from './permissionService';

export const requestPermission = async (userId: string, permissions: { canAdd: boolean; canUpdate: boolean; canDelete: boolean }) => {
    return await PermissionRequest.create({
        user: userId,
        requestedPermissions: permissions,
        status: 'pending'
    });
};

export const getPendingRequests = async () => {
    return await PermissionRequest.find({ status: 'pending' }).populate('user', 'username email');
};

export const getRequestById = async (requestId: string) => {
    return await PermissionRequest.findById(requestId).populate('user', 'username email');
};

export const approvePermissionRequest = async (requestId: string, adminId: string, approvals: { canAdd?: boolean; canUpdate?: boolean; canDelete?: boolean }) => {
    const request = await PermissionRequest.findById(requestId);
    if (!request) throw new Error('Request not found');

    // עדכון ההרשאות
    await setUserPermissions(request.user.toString(), {
        canAdd: approvals.canAdd || false,
        canUpdate: approvals.canUpdate || false,
        canDelete: approvals.canDelete || false
    });

    // סימון הבקשה כמטופלת
    request.status = 'approved';
    request.reviewedBy = new mongoose.Types.ObjectId(adminId);
    return await request.save();
};

export const denyPermissionRequest = async (requestId: string, adminId: string) => {
    return await PermissionRequest.findByIdAndUpdate(
        requestId,
        { status: 'denied', reviewedBy: adminId },
        { new: true }
    );
};

export const getUserPermissionRequests = async (userId: string) => {
    return await PermissionRequest.find({ user: userId })
        .populate('reviewedBy', 'firstName lastName') // מביא את שם המנהל שאישר
        .sort({ createdAt: -1 }); // מסדר לפי תאריך מהחדש לישן
};
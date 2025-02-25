import mongoose, { ObjectId } from 'mongoose';
import PermissionRequest from '../models/PermissionRequest';
import User from '../models/User';

export const requestPermission = async (userId: string, permissions: { canAdd: boolean; canUpdate: boolean; canDelete: boolean }) => {
    return await PermissionRequest.create({
        user: userId,
        requestedPermissions: permissions,
        status: 'pending',
        reviewedBy: null,
    });
};

export const getPendingRequests = async () => {
    return await PermissionRequest.find({ status: 'pending' }).populate('user', 'username');
};

export const getUserPendingRequests = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const pendingRequests = await PermissionRequest.find({
      _id: { $in: user.permissionRequests },
      status: 'pending'
    }).populate('user', 'username email');
    
    return pendingRequests;
  };
export const getRequestById = async (requestId: string) => {
    return await PermissionRequest.findById(requestId).populate('user', 'username email');
};

export const setUserPermissions = async (userId: string, permissions: { canAdd: boolean; canUpdate: boolean; canDelete: boolean }) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { permissions },
            { new: true, runValidators: true }
        );
        return updatedUser;
    } catch (error) {
        console.error('Error updating user permissions:', error);
        throw new Error('Failed to update user permissions');
    }
};

export const approvePermissionRequest = async (requestId: string, adminId: string, approvals: { canAdd?: boolean; canUpdate?: boolean; canDelete?: boolean }) => {
    const request = await PermissionRequest.findById(requestId);

    if (!request) throw new Error('Request not found');
    const user= await User.findById(request.user);

    await setUserPermissions(request.user.toString(), {
        canAdd: approvals.canAdd || user?.permissions?.canAdd || false,
        canUpdate: approvals.canUpdate || user?.permissions?.canUpdate || false,
        canDelete: approvals.canDelete || user?.permissions?.canDelete || false
    });

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

export const getUserPermissionRequests = async (userId: string | mongoose.Types.ObjectId) => {
    const user = await User.findById(userId).select('permissionRequests');
    if (!user) {
      throw new Error('User not found');
    }
    const requests = await PermissionRequest.find({
      _id: { $in: user.permissionRequests }
    })
      .populate('reviewedBy', 'username')
      .sort({ createdAt: -1 });
    return requests;
  };
import Permission from '../models/Permission';

export const setUserPermissions = async (userId: string, permissions: { canAdd: boolean; canUpdate: boolean; canDelete: boolean }) => {
    return await Permission.findOneAndUpdate(
        { user: userId },
        permissions,
        { upsert: true, new: true }
    );
};

export const getUserPermissions = async (userId: string) => {
    return await Permission.findOne({ user: userId });
};

export const deleteUserPermissions = async (userId: string) => {
    return await Permission.findOneAndDelete({ user: userId });
};

export const checkUserPermission = async (userId: string, action: 'canAdd' | 'canUpdate' | 'canDelete') => {
    const permission = await Permission.findOne({ user: userId });
    return permission ? permission[action] : false;
};

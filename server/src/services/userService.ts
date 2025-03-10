import PermissionRequest from '../models/PermissionRequest';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const createUser = async (userData: any) => {
    const user = new User({ ...userData});
    return await user.save();
};

export const getUserById = async (userId: string) => {
    return await User.findById(userId).select('-password');
};

export const getAllUsers = async () => {
    return await User.find({ isActive: true }).select('-password');
  };

export const updateUser = async (userId: string, updateData: any) => {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
};

export const deleteUser = async (userId: string) => {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );
  
    await PermissionRequest.updateMany(
      { userId: userId },
      { isActive: false }
    );
  
    return updatedUser;
  };

export const authenticateUser = async (username: string, password: string) => {
    const user = await User.findOne({ username });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
};

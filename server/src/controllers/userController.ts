import { Request, Response } from 'express';
import {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
} from '../services/userService';
import User from '../models/User';


export const createUserController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, phone, password } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : '';

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
      profilePicture 
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};


export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};


export const getAllUsersController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};


export const updateUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await updateUser(req.params.id, req.body);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};


export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await deleteUser(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

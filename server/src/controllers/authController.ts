// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
  
      const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token, user }); // ✅ ללא return
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error });
    }
  };
  
export const logoutUserController = async (_req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error });
  }
};

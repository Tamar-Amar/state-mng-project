// src/routes/authRoutes.ts
import express from 'express';
import { loginUserController, logoutUserController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', loginUserController);
router.post('/logout', authMiddleware, logoutUserController);

export default router;

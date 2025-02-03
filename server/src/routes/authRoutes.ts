// src/routes/authRoutes.ts
import express from 'express';
import { loginUserController, logoutUserController } from '../controllers/authController';

const router = express.Router();

router.post('/login', loginUserController);
router.post('/logout', logoutUserController);

export default router;

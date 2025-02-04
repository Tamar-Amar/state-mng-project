import express from 'express';
import { loginUserController, logoutUserController } from '../controllers/authController';
import { authAndPermissionMiddleware } from '../middlewares/authAndPermissionMiddleware';

const router = express.Router();

router.post('/login', loginUserController);
router.post('/logout', logoutUserController);
router.get('/me', authAndPermissionMiddleware(), (req, res) => {
    res.status(200).json({ user: req.user });
});

export default router;

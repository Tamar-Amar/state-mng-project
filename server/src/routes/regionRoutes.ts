import express from 'express';
import { getAllRegion, createRegion } from '../controllers/regionController';
import { authAndPermissionMiddleware } from '../middlewares/authAndPermissionMiddleware';

const router = express.Router();

router.post('/', authAndPermissionMiddleware(undefined, 'canAdd'), createRegion);
router.get('/', authAndPermissionMiddleware(), getAllRegion);

export default router;

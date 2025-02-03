import express from 'express';
import {getAllRegion, createRegion} from '../controllers/regionController';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', adminMiddleware, createRegion);

router.get('/', adminMiddleware, getAllRegion);


export default router;

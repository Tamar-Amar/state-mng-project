import express from 'express';
import {getAllRegion, createRegion} from '../controllers/regionController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createRegion);

router.get('/', authMiddleware, getAllRegion);


export default router;

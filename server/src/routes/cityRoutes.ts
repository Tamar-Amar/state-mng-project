import express from 'express';
import {
    addCityController,
    deleteCityController,
    getAllCitiesController
} from '../controllers/CityController';
import { authAndPermissionMiddleware } from '../middlewares/authAndPermissionMiddleware';

const router = express.Router();

console.log("Starting city routes");

router.post('/add', authAndPermissionMiddleware(undefined, 'canAdd'), addCityController);

router.delete('/delete/:cityId', authAndPermissionMiddleware(undefined, 'canDelete'), deleteCityController);

router.get('/', authAndPermissionMiddleware(), getAllCitiesController);

export default router;

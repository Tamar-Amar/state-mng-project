import { Request, Response } from 'express';
import { addCity, deleteCity, getCitiesByState } from '../services/CityService';
import { City } from '../models/State';

export const addCityController = async (req: Request, res: Response) => {
    try {
        const { cityName, stateId } = req.body;
        const city = await addCity(cityName, stateId);
        console.log("City added:", city);
        res.status(201).json(city);
    } catch (error) {
        console.error("Error in addCity:", error);
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};

export const deleteCityController  = async (req: Request, res: Response) => {
    try {
        const { cityId } = req.params;
        const result = await deleteCity(cityId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in deleteCity:", error);
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};

export const getCitiesByStateController  = async (req: Request, res: Response) => {
    try {
        const { stateId } = req.params;
        const cities = await getCitiesByState(stateId);
        res.status(200).json(cities);
    } catch (error) {
        console.error("Error in getCitiesByState:", error);
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};

export const getAllCitiesController = async (req: Request, res: Response) => {
    console.log("---------getAllCitiesController");
    try {
        const cities = await City.find({ isActive: true });
        res.status(200).json(cities);
    } catch (error) {
        console.error("Error in getAllCitiesController:", error);
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};
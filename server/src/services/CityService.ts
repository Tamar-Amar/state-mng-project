
import { City, State } from '../models/State';
import mongoose from 'mongoose';

export const addCity = async (cityName: string, stateId: string) => {
    try {
        const state = await State.findById(stateId);
        if (!state) throw new Error('State not found');

        const newCity = new City({
            cityName,
            stateId: new mongoose.Types.ObjectId(stateId)
        });

        const savedCity = await newCity.save();

        await State.findByIdAndUpdate(stateId, { 
            $push: { cities: savedCity._id } 
        });

        return savedCity;
    } catch (error) {
        console.error("Error in addCity:", error);
        throw new Error(error instanceof Error ? `Error adding city: ${error.message}` : "Unknown error occurred");
    }
};

export const deleteCity = async (cityId: string) => {
    try {
        const city = await City.findById(cityId);
        if (!city) throw new Error('City not found');

        await City.findByIdAndUpdate(cityId, { isActive: false });

        await State.findByIdAndUpdate(city.stateId, { 
            $pull: { cities: cityId }
        });

        return { message: 'City deleted successfully' };
    } catch (error) {
        console.error("Error in deleteCity:", error);
        throw new Error(error instanceof Error ? `Error deleting city: ${error.message}` : "Unknown error occurred");
    }
};

export const getCitiesByState = async (stateId: string) => {
    try {
        const cities = await City.find({ stateId, isActive: true });
        return cities;
    } catch (error) {
        console.error("Error in getCitiesByState:", error);
        throw new Error(error instanceof Error ? `Error fetching cities: ${error.message}` : "Unknown error occurred");
    }
};

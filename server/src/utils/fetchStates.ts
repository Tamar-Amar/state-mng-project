import axios from 'axios';
import State from '../models/State';
import logger from './logger';

export const fetchAndSaveStates = async () => {
    try {
        const statesCount = await State.countDocuments();
        if (statesCount > 0) {
            logger.info('States already exist in the database. Skipping fetch.');
            return;
        }
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const states: any[] = response.data;

        const statesToInsert = states.map((state: any) => ({
            name: state.name.common,
            flag: state.flags.svg,
            population: state.population,
            region: state.region,
            isActive: true,
        }));

        await State.insertMany(statesToInsert);
        logger.info('Fetched and saved states to the database.');
    } catch (error) {
        logger.error('Error fetching or saving states:', error);
    }
};

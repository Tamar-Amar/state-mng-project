import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL+"/regions";

export const fetchRegions = async (): Promise<{ nameRegion: string }[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};
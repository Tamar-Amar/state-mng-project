import axios from 'axios';
import { State } from '../types/State';

const API_BASE_URL = 'http://localhost:5000/api/states'; // כתובת ה-API

export const fetchStates = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addState = async (newState: {
  name: string;
  flag: string;
  population: number;
  region: string;
}) => {
  const response = await axios.post(API_BASE_URL, newState);
  return response.data;
};

export const deleteState = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updateState = async ({
  _id,
  ...updatedState
}: State): Promise<State> => {
  const response = await axios.put(`${API_BASE_URL}/${_id}`, updatedState);
  return response.data;
};
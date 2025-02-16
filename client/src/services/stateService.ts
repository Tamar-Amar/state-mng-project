import { AddStateResponse, State } from "../types";
import { api } from "./apiService";

export const fetchStates = async (): Promise<State[]> => {
  const response = await api.get('/states');
  return response.data;
};

export const getStateById = async (id: string): Promise<State> => {
  const response = await api.get(`/states/${id}`);
  return response.data;
};

export const addState = async (state: State): Promise<AddStateResponse> => {
  const response = await api.post('/states', state);
  return response.data;
};

export const updateState = async (id: string, state: State): Promise<State> => {
  console.log(`Updating ${id}`);
  const response = await api.put(`/states/${id}`, state);
  return response.data;
};

export const deleteState = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/states/${id}`);
  return response.data;
};

export const restoreState = async (id: string) => {
  const response = await api.patch(`/states/${id}/restore`);
  return response.data;
};

import { User } from "../types";
import { api } from "./apiService";

// Users Service
export const fetchUsers = async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  };
  
  export const getUserById = async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  };
  
  export const createUser = async (user: User): Promise<User> => {
    const response = await api.post('/users', user);
    return response.data;
  };
  
  export const updateUser = async (id: string, user: User): Promise<User> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  };
  
  export const deleteUser = async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  };
  
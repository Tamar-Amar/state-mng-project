import { User } from "../types";
import { api } from "./apiService";

export const loginUser = async (credentials: { username: string; password: string }): Promise<{ token: string; user: User }> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  };
  
  export const registerUser = async (userData: User): Promise<User> => {
    const response = await api.post('/users/register', userData);
    return response.data;
  };
  
  export const logoutUser = async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/logout');
    return response.data;
  };
  
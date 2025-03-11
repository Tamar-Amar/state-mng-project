import { User } from "../types";
import { api } from "./apiService";

export const loginUser = async (credentials: { username: string; password: string }): Promise<{ token: string; user: User }> => {
    const response = await api.post('/auth/login', credentials);
    console.log("---------fgh",response.data);
    return response.data;
  };
  
  export const registerUser = async (userData: FormData): Promise<User> => {
    const response = await api.post('/users/register', userData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  };
  
  export const logoutUser = async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/logout');
    return response.data;
  };

  export const getCurrentUser = async () => {
    const response = await api.get('/auth/me');
    return response.data;
  };  
  
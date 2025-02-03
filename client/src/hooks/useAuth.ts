import { useMutation } from 'react-query';
import { loginUser, registerUser } from '../services/authService';

export const useLoginUser = () => {
  return useMutation(loginUser, {
    onSuccess: (data) => {
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token); 
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export const useRegisterUser = () => {
  return useMutation(registerUser, {
    onSuccess: (data) => {
      console.log('Registration successful:', data);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

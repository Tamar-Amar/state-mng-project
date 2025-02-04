import { useMutation } from 'react-query';
import { loginUser, registerUser } from '../services/authService';
import { CleaningServices } from '@mui/icons-material';

export const useLoginUser = () => {
  return useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token); 
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export const useRegisterUser = () => {
  return useMutation(registerUser, {
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

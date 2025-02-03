import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("auth token in local storage:",token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
    console.log("send auth token in header:",config.headers.Authorization)
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useLoginUser } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const loginMutation = useLoginUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        alert('Login successful!');
        navigate('/home'); 
      },
      onError: (error) => {
        console.error('Login failed:', error);
        setError('Login failed. Please check your credentials.');
      },
    });
  };


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Username"
        name="username"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" fullWidth disabled={loginMutation.isLoading}>
        {loginMutation.isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;

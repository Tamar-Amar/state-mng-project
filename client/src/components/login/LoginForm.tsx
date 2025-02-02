import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', credentials);
    // כאן תשלב קריאה ל-API
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Username"
        name="username"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
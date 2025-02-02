import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Alert } from '@mui/material';
import { useRegisterUser } from '../../hooks/useAuth';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'user', 
    profilePicture: null as File | null,
    isActive: true,
    joinDate: new Date(),
  });

  const [error, setError] = useState<string | null>(null);
  const registerMutation = useRegisterUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'profilePicture' && files && files.length > 0) {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value as string | Blob);
      }
    });

    registerMutation.mutate(data, {
      onSuccess: () => {
        alert('Registration successful!');
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          phone: '',
          password: '',
          role: 'user',
          profilePicture: null,
          isActive: true,
          joinDate: new Date(),
        });
        setError(null);
      },
      onError: (err) => {
        console.error('Registration failed:', err);
        setError('Registration failed. Please try again.');
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>Register</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField label="First Name" name="firstName" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Last Name" name="lastName" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Username" name="username" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Email" name="email" type="email" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Phone" name="phone" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} required />

      <TextField
        select
        label="Role"
        name="role"
        fullWidth
        margin="normal"
        value={formData.role}
        onChange={handleChange}
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>

      <Button variant="contained" component="label" fullWidth sx={{ mt: 1 }}>
        Upload Profile Picture
        <input type="file" name="profilePicture" hidden onChange={handleChange} accept="image/*" />
      </Button>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;

import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import LoginForm from '../components/login/LoginForm';
import RegisterForm from '../components/login/RegisterForm';
import { useRecoilState } from 'recoil';
import { userAtom } from '../store/userAtom';
import { User } from '../types/User';
import { Navigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [user, setUser] = useRecoilState<User | null>(userAtom);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (user && user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      {!user && (
        <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', mt: 4 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {tabIndex === 0 && <LoginForm />}
          {tabIndex === 1 && <RegisterForm />}
        </Box>
      )}
      {user && user.role === 'admin' && (
        <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', mt: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Add New User
          </Typography>
          <RegisterForm />
        </Box>
      )}
    </Box>
  );
};

export default AuthPage;

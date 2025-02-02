// src/pages/AuthPage.tsx
import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Button, Avatar } from '@mui/material';
import LoginForm from '../components/login/LoginForm';
import RegisterForm from '../components/login/RegisterForm';
import { useRecoilState } from 'recoil';
import { userAtom } from '../store/userAtom';
import { User } from '../types/User';

const AuthPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [user, setUser] = useRecoilState<User | null>(userAtom);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

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
    </Box>
  );
};

export default AuthPage;
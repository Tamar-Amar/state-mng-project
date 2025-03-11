// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import LoginForm from '../components/login/LoginForm';
import RegisterForm from '../components/login/RegisterForm';
import { useRecoilState } from 'recoil';
import { userAtom } from '../store/userAtom';
import { User } from '../types/User';
import { Navigate } from 'react-router-dom';
import { LABELS, OPTION } from '../constants/componentsTxt';

const AuthPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [user] = useRecoilState<User | null>(userAtom);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (user && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        p: 2,
      }}
    >
      {!user && (
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 3 }}
          >
            <Tab
              label={LABELS.login}
              sx={{
                fontWeight: tabIndex === 0 ? 'bold' : 'normal',
                fontSize: '1.1rem',
              }}
            />
            <Tab
              label={LABELS.signUp}
              sx={{
                fontWeight: tabIndex === 1 ? 'bold' : 'normal',
                fontSize: '1.1rem',
              }}
            />
          </Tabs>
          {tabIndex === 0 && <LoginForm />}
          {tabIndex === 1 && <RegisterForm />}
        </Box>
      )}
      {user && user.role === 'admin' && (
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            {OPTION.create('User')}
          </Typography>
          <RegisterForm />
        </Box>
      )}
    </Box>
  );
};

export default AuthPage;

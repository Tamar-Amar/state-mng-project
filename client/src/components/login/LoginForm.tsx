// src/components/login/LoginForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert, Paper } from '@mui/material';
import { useLoginUser } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../store/userAtom';
import { LOGIN_TEXT } from '../../constants/componentsTxt';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const loginMutation = useLoginUser();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setSuccess(true);
        setTimeout(() => navigate('/'));
      },
      onError: () => {
        setError(LOGIN_TEXT.loginFailedMessage);
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 4,
      }}
    >
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 17 }}>
        <Paper elevation={8} sx={{ p: 4, borderRadius: 2 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
              {LOGIN_TEXT.loginFormTitle}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              label={LOGIN_TEXT.loginUsernameLabel}
              name="username"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#c3cfe2' },
                  '&:hover fieldset': { borderColor: '#f5f7fa' },
                  '&.Mui-focused fieldset': { borderColor: '#00A6FB' },
                },
              }}
            />
            <TextField
              label={LOGIN_TEXT.loginPasswordLabel}
              name="password"
              type="password"
              fullWidth
              margin="normal"
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#c3cfe2' },
                  '&:hover fieldset': { borderColor: '#f5f7fa' },
                  '&.Mui-focused fieldset': { borderColor: '#00A6FB' },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loginMutation.isPending}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: '1rem',
                background: 'linear-gradient(45deg, #00A6FB, #FFD700)',
              }}
            >
              {loginMutation.isPending ? LOGIN_TEXT.loginSubmitPending : LOGIN_TEXT.loginSubmit}
            </Button>

            <Snackbar
              open={success}
              autoHideDuration={3000}
              onClose={() => setSuccess(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert severity="success" sx={{ width: '100%' }}>
                {LOGIN_TEXT.loginSuccessMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginForm;

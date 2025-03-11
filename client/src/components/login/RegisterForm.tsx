// src/components/login/RegisterForm.tsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Alert,
  IconButton,
  InputAdornment,
  Avatar,
  Snackbar,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useFormik } from 'formik';
import { registerValidationSchema } from '../../types/validations/UserValidation';
import { useCurrentUser, useRegisterUser } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LOGIN_TEXT } from '../../constants/componentsTxt';

const RegisterForm: React.FC = () => {
  const registerMutation = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values, { resetForm, setSubmitting, setErrors }) => {
      const data = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
          data.append(key, value as string | Blob);
        }
      });
      
      registerMutation.mutate(data, {
        onSuccess: () => {
          resetForm();
          setPreview(null);
          setIsImageUploaded(false);
          setSubmitting(false);
          setShowSuccess(true);
          setTimeout(() => navigate('/'), 3000);
        },
        onError: (err) => {
          console.error('Registration failed:', err);
          setErrors({ email: LOGIN_TEXT.registrationFailedMessage });
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
            {LOGIN_TEXT.registerFormTitle}
          </Typography>

          {formik.errors.email && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formik.errors.email}
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label={LOGIN_TEXT.firstNameLabel}
              name="firstName"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#c3cfe2' },
                  '&:hover fieldset': { borderColor: '#f5f7fa' },
                  '&.Mui-focused fieldset': { borderColor: '#00A6FB' },
                },
              }}
            />

            <TextField
              label={LOGIN_TEXT.lastNameLabel}
              name="lastName"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#c3cfe2' },
                  '&:hover fieldset': { borderColor: '#f5f7fa' },
                  '&.Mui-focused fieldset': { borderColor: '#00A6FB' },
                },
              }}
            />
          </Box>

          {/* שדה שם משתמש */}
          <TextField
            label={LOGIN_TEXT.usernameLabel}
            name="username"
            fullWidth
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#c3cfe2' },
                '&:hover fieldset': { borderColor: '#f5f7fa' },
                '&.Mui-focused fieldset': { borderColor: '#00A6FB' },
              },
            }}
          />


          <Box sx={{ display: 'flex', gap: 2, mb: 2 , mt: 2}}>
            <TextField
              label={LOGIN_TEXT.emailLabel}
              name="email"
              type="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#c3cfe2' },
                  '&:hover fieldset': { borderColor: '#f5f7fa' },
                  '&.Mui-focused fieldset': { borderColor: '#00A6FB' },
                },
              }}
            />

            <TextField
              label={LOGIN_TEXT.phoneLabel}
              name="phone"
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#c3cfe2' },
                  '&:hover fieldset': { borderColor: '#f5f7fa' },
                  '&.Mui-focused fieldset': { borderColor: '#00A6FB' },
                },
              }}
            />
          </Box>


          <TextField
            label={LOGIN_TEXT.passwordLabel}
            name="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#c3cfe2' },
                '&:hover fieldset': { borderColor: '#f5f7fa' },
                '&.Mui-focused fieldset': { borderColor: '#00A6FB' },
              },
            }}
          />

          <TextField
            select
            label={LOGIN_TEXT.roleLabel}
            name="role"
            fullWidth
            margin="normal"
            value={formik.values.role}
            onChange={formik.handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#c3cfe2' },
                '&:hover fieldset': { borderColor: '#f5f7fa' },
                '&.Mui-focused fieldset': { borderColor: '#00A6FB' },
              },
            }}
          >
            <MenuItem value={LOGIN_TEXT.optionUser}>{LOGIN_TEXT.optionUser}</MenuItem>
            {currentUser && currentUser.user?.role === 'admin' && (
              <MenuItem value={LOGIN_TEXT.optionAdmin}>{LOGIN_TEXT.optionAdmin}</MenuItem>
            )}
          </TextField>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
            {preview && (
              <Avatar src={preview} sx={{ width: 100, height: 100 }} />
            )}
            <Button
              variant="contained"
              component="label"
              sx={{
                background: 'linear-gradient(45deg, #00A6FB, #FFD700)',
              }}
            >
              {isImageUploaded ? LOGIN_TEXT.changeProfileImage : LOGIN_TEXT.uploadProfilePicture}
              <input
                type="file"
                name="profilePicture"
                hidden
                onChange={(event) => {
                  if (event.currentTarget.files && event.currentTarget.files[0]) {
                    const file = event.currentTarget.files[0];
                    formik.setFieldValue('profilePicture', file);
                    setPreview(URL.createObjectURL(file));
                    setIsImageUploaded(true);
                  }
                }}
                accept="image/*"
              />
            </Button>
          </Box>

          <Button
            sx={{ mt: 4 }}
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
            style={{
              background: 'linear-gradient(45deg, #00A6FB, #FFD700)',
            }}
          >
            {LOGIN_TEXT.registerSubmit}
          </Button>

          {/* <Snackbar
            open={Boolean(formik.isSubmitting)}
            autoHideDuration={3000}
            onClose={() => {}}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              {LOGIN_TEXT.registrationSuccessMessage}
            </Alert>
          </Snackbar> */}

          <Snackbar
            open={showSuccess}
            autoHideDuration={3000}
            onClose={() => setShowSuccess(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{
              top: '40% !important',
              left: '50% !important',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              {LOGIN_TEXT.registrationSuccessMessage}
            </Alert>
          </Snackbar>


        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;

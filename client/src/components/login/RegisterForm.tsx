// src/components/login/RegisterForm.tsx
import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { registerValidationSchema } from '../../types/validations/UserValidation';
import { useCurrentUser, useRegisterUser } from '../../hooks/useAuth';
import styles from '../../styles/RegisterForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { LOGIN_TEXT } from '../componentsTxt';

const RegisterForm: React.FC = () => {
  const registerMutation = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  
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
          alert(LOGIN_TEXT.registrationSuccessMessage);
          resetForm();
          setPreview(null);
          setIsImageUploaded(false);
          setSubmitting(false);
          navigate('/');
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
    <Box component="form" onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <Typography variant="h5" gutterBottom className={styles.title}>
        {LOGIN_TEXT.registerFormTitle}
      </Typography>

      {formik.errors.email && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formik.errors.email}
        </Alert>
      )}

      <Box className={styles.flexContainer}>
        <TextField
          label={LOGIN_TEXT.firstNameLabel}
          name="firstName"
          fullWidth
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
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
        />
      </Box>

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
      />

      <Box className={styles.flexContainer}>
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
      />

      <TextField
        select
        label={LOGIN_TEXT.roleLabel}
        name="role"
        fullWidth
        margin="normal"
        value={formik.values.role}
        onChange={formik.handleChange}
      >
        <MenuItem value={LOGIN_TEXT.optionUser}>{LOGIN_TEXT.optionUser}</MenuItem>
        {currentUser && currentUser.user?.role === 'admin' && (
          <MenuItem value={LOGIN_TEXT.optionAdmin}>{LOGIN_TEXT.optionAdmin}</MenuItem>
        )}
      </TextField>

      <Box className={styles.flexContainer}>
        {preview && (
          <Box className={styles.avatarContainer}>
            <Avatar src={preview} className={styles.avatar} />
          </Box>
        )}
        <Button
          variant="contained"
          component="label"
          className={`${styles.uploadButton} ${isImageUploaded ? styles.uploaded : ''}`}
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

      <Button type="submit" variant="contained" fullWidth className={styles.submitButton} disabled={formik.isSubmitting}>
        {LOGIN_TEXT.registerSubmit}
      </Button>

      <Snackbar
        open={Boolean(formik.isSubmitting)}
        autoHideDuration={3000}
        onClose={() => {}}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {LOGIN_TEXT.registrationSuccessMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;

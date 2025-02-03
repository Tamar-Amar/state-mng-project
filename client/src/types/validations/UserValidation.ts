import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
  firstName: yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
  lastName: yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
  username: yup.string().min(4, 'Username must be at least 4 characters').required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().matches(/^\d+$/, 'Phone must contain only numbers').required('Phone is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Role is required'),
});

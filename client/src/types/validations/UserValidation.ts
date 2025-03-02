import * as yup from 'yup';
import VALID_MSG from '../../constants/validationTxt';

export const registerValidationSchema = yup.object().shape({
  firstName: yup.string()
    .min(2, VALID_MSG.NAME_MIN)
    .required(VALID_MSG.REQUIRED_MSG('First name')),
  lastName: yup.string()
    .min(2, VALID_MSG.NAME_MIN)
    .required(VALID_MSG.REQUIRED_MSG('Last name')),
  username: yup.string()
    .min(4, VALID_MSG.USERNAME_MIN)
    .required(VALID_MSG.REQUIRED_MSG('Username')),
  email: yup.string()
    .email(VALID_MSG.EMAIL_INVALID)
    .required(VALID_MSG.REQUIRED_MSG('Email')),
  phone: yup.string()
    .matches(/^\d+$/, VALID_MSG.PHONE_ONLY_NUMBERS)
    .required(VALID_MSG.REQUIRED_MSG('Phone')),
  password: yup.string()
    .min(6, VALID_MSG.PASSWORD_MIN)
    .required(VALID_MSG.REQUIRED_MSG('Password')),
  role: yup.string()
    .oneOf(['user', 'admin'], VALID_MSG.ROLE_INVALID)
    .required(VALID_MSG.REQUIRED_MSG('Role')),
});

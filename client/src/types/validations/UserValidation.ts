import * as yup from 'yup';
import { VALID_MSG } from '../../constants/componentsTxt';

export const registerValidationSchema = yup.object().shape({
  firstName: yup.string()
    .min(2, VALID_MSG.nameMin)
    .required(VALID_MSG.requiredFiled('First name')),
  lastName: yup.string()
    .min(2, VALID_MSG.nameMin)
    .required(VALID_MSG.requiredFiled('Last name')),
  username: yup.string()
    .min(4, VALID_MSG.nameMin)
    .required(VALID_MSG.requiredFiled('Username')),
  email: yup.string()
    .email(VALID_MSG.email)
    .required(VALID_MSG.requiredFiled('Email')),
  phone: yup.string()
    .matches(/^\d+$/, VALID_MSG.phoneOnlyNumbers)
    .required(VALID_MSG.requiredFiled('Phone')),
  password: yup.string()
    .min(6, VALID_MSG.passwordMin)
    .required(VALID_MSG.requiredFiled('Password')),
  role: yup.string()
    .oneOf(['user', 'admin'], VALID_MSG.role)
    .required(VALID_MSG.requiredFiled('Role')),
});

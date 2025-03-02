// src/constants/VALID_MSG.ts
const VALID_MSG = {
  FLAG_URL: 'Flag must be a valid URL',
  POPULATION_MIN: 'Population cannot be less than 0',
  REGION_INVALID: 'Region must be one of the predefined options or a newly added one',
  NAME_MIN: 'Name must be at least 3 characters long',
  NAME_MATCH: 'Name can only contain letters from any language, spaces, and hyphens',
  NAME_MAX: 'Name must not exceed 30 characters',
  REGION_NOT_EMPTY: 'Region cannot be empty',

  REQUIRED_MSG: (field: string) => `${field} is required`,
  USERNAME_MIN: 'Username must be at least 4 characters',
  EMAIL_INVALID: 'Invalid email format',
  PHONE_ONLY_NUMBERS: 'Phone must contain only numbers',
  PASSWORD_MIN: 'Password must be at least 6 characters',
  ROLE_INVALID: 'Invalid role',
};

export default VALID_MSG;

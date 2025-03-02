
export const STATE_TABLE_TEXT = {
    confirmDeleteState: "Are you sure you want to delete this state?",
    stateDeletedSuccess: "State deleted successfully!",
    stateDeletionFailed: "State deletion failed.",
    noPermissionDeleteState: "You don’t have permission to delete this state. Please contact the system administrator.",
  
    confirmDeleteCity: "Are you sure you want to delete this city?",
    noPermissionDeleteCity: "You don’t have permission to delete this city.",
  
    noPermissionEditState: "You don’t have permission to edit this state. Please contact the system administrator.",
  
    editButton: "Edit",
    deleteButton: "Delete",
    viewCitiesButton: "View Cities",

    headerFlag: "Flag",
    headerCountryName: "Country Name",
    headerRegion: "Region",
    headerPopulation: "Population",
    headerActions: "Actions",
  
    quickSearchPlaceholder: "Quick search",
  };

export const PERSONAL_TEXT = {
  currentPermissionsTitle: "Current Permissions for {username}:",
  chipAdd: "Add",
  chipUpdate: "Update",
  chipDelete: "Delete",

  // PermissionRequestsPopup.tsx
  permissionRequestsDialogTitle: "Pending Permission Requests for {username}",
  noPermissionRequestsFound: "No permission requests found for this user.",
  tableHeaderDate: "Date",
  tableHeaderRequestedPermissions: "Requested Permissions",
  tableHeaderStatus: "Status",
  tableHeaderAction: "Action",
  approvingText: "Approving...",
  approveButton: "Approve",
  closeButton: "Close",

  // PermissionRequestsHistory.tsx
  permissionsHistoryTitle: "Permissions History:",
  errorLoadingPermissions: "Error loading permission requests.",
  noPermissionRequestsFoundHistory: "No permission requests found.",

  // PersonalDetails.tsx
  labelUsername: "Username",
  labelFirstName: "First Name",
  labelLastName: "Last Name",
  labelEmail: "Email",
  labelPhone: "Phone",
  editDetailsButton: "Edit Details",
  saveButton: "Save",
  cancelButton: "Cancel",

  // PermissionsHistory.tsx
  sendPermissionRequestButton: "Send Permission Request",

  // SendPermissionRequestPopup.tsx
  sendPermissionRequestDialogTitle: "Send Permission Request",
  selectPermissionPrompt: "Please select the permission you would like to request:",
  noPermissionOptionsMessage: "You already have all the permissions or a pending request exists.",
  requestPermissionLabel: (option: string) => `Request '${option}' Permission`,
  submitRequestButton: "Submit Request",
  successPermissionRequestMessage: "Your permission request has been sent successfully! Thank you.",
  errorPermissionRequestMessage: "There was an error sending your permission request. Please try again later.",

  noneText: "None",
  byText: " by ",
  updatedText: "Updated:",
  noUserFound: "No user found",
};

export const LOGIN_TEXT = {
  // LoginForm.tsx
  loginFormTitle: "Login",
  loginUsernameLabel: "Username",
  loginPasswordLabel: "Password",
  loginSubmit: "Login",
  loginSubmitPending: "Logging in...",
  loginSuccessMessage: "Login successful! Redirecting...",
  loginFailedMessage: "Login failed. Please check your credentials.",

  // RegisterForm.tsx
  registerFormTitle: "Register",
  firstNameLabel: "First Name",
  lastNameLabel: "Last Name",
  usernameLabel: "Username",
  emailLabel: "Email",
  phoneLabel: "Phone",
  passwordLabel: "Password",
  roleLabel: "Role",
  optionUser: "user",
  optionAdmin: "admin",
  uploadProfilePicture: "Upload Profile Picture",
  changeProfileImage: "Change Profile Image",
  registerSubmit: "Register",
  registrationSuccessMessage: "Registration successful! Redirecting to login...",
  registrationFailedMessage: "Registration failed. Please try again.",
};

export const CITY_TEXT = {
  permissionAddCity: "You don’t have permission to add a city.",
  permissionDeleteCity: "You don’t have permission to delete a city.",
  citiesInTitle: "Cities in {stateName}",
  noCitiesAvailable: "No cities available.",
  cityNameLabel: "City Name",
  closeButton: "Close",
};

export const STATE_FORM_TEXT = {
  addStateTitle: 'Add New State',
  editStateTitlePrefix: 'Edit State: ',
  stateNameLabel: 'State Name',
  flagUrlLabel: 'Flag URL',
  populationLabel: 'Population',
  regionLabel: 'Region',
  regionNotFound: 'Region not found. Add it?',
  addRegionButton: 'Add "{newRegion}" as a new region',
  cancelButton: 'Cancel',
  submitButtonAdd: 'Add State',
  submitButtonUpdate: 'Update State',
  unsavedChangesTitle: 'Unsaved Changes',
  unsavedChangesMessage: 'You have unsaved changes. Are you sure you want to discard them and exit?',
  dialogStayButton: 'Stay',
  dialogDiscardButton: 'Discard and Exit',
  noPermissionTitle: "You don’t have permission to {action} a state.",
  redirectMessage: 'Redirecting you back to the home page...',
  goHomeButton: 'Go to Home Now',
  successUpdateMessage: 'State updated successfully!',
  errorUpdateMessage: 'Failed to update state.',
  successAddMessage: 'State added successfully!',
  errorAddMessage: 'Failed to add state.',
  successAddRegionMessage: 'Region "{newRegion}" added successfully!',
  errorAddRegionMessage: 'Failed to add region.',
  invalidRegionMessage: 'Invalid region name. Please use only letters and spaces.',
  noPermission: "You don’t have permission to {action} a state.",
  redirecting: "Redirecting you back to the home page...",
  goHomeNow: "Go to Home Now",

};

export const ERROR_BOUNDARY_TEXTS = {
  errorTitle: "Oops! Something went wrong.",
  errorMessage: "An unexpected error occurred. Please try refreshing the page.",
  reloadButton: "Reload Page",
};

export const NAVBAR_TEXT = {
  states: 'States',
  users: 'Users',
  permissions: 'Permissions',
  personalDetails: 'Personal Details',
  logout: 'Logout',
  editing: 'Editing:',
};

export const GNRL_TXT = {
  FLAG_URL: 'Flag must be a valid URL',
  LOADING: 'Loading...',
  ERROR:{
    GET: (field: string) => `Error getting ${field}`,
    UPDATE: (field: string) => `Error updating ${field}`,
    CREATE: (field: string) => `Error creating ${field}`,
    DELETE: (field: string) => `Error deleting ${field}`,
    LOAD:  (field: string) => `Error loading ${field}`,
    SAVE: (field: string) => `Error saving ${field}`,
    NOT_FOUND: 'Not Found',
    PERMISSION: 'You don’t have permission to perform this action. Please contact the system administrator.',
    REQUEST: 'Error requesting data.',
    SUBMIT: 'Error submitting the form.',
  },
  BUTTON: {
    CANCEL: 'Cancel',
    DELETE: 'Delete',
  },
  SNACKBAR: {
    DELETE_SUCCESS: 'User deleted successfully',
  },
  TOOLTIP: {
    APPROVE: 'Approve',
    DENY: 'Deny',
  },
  OPTIONS:{
    CREATE: (field: string) => `Add New ${field}`,
    EDIT: (field: string) => `Edit ${field}`,
    DELETE: (field: string) => `Delete ${field}`,
  },
  USER_PROP:{
    PROFILE: 'Profile',
    USERNAME: 'Username',
    NAME: 'Name',
    EMAIL: 'Email',
    ROLE: 'Role',
    PERMISSIONS: 'Permissions',
  },
  DIALOG: {
    CONFIRM_TITLE_DLT: 'Confirm Deletion',
    CONFIRM_TEXT_DLT: 'Are you sure you want to delete this user? This action will mark the user as inactive and remove them from the list.',
  },
  TAB_LBL:{
    PRSNL_DTLS: 'Personal Details',
    PERMISSION: 'Permission',
}
};

export const VALID_MSG = {
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
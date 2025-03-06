
export const STATE_TABLE_TEXT = {
    confirmDeleteState: "Are you sure you want to delete this state?",
    stateDeletedSuccess: "State deleted successfully!",
    stateDeletionFailed: "State deletion failed.",
    noPermissionDeleteState: "You don’t have permission to delete this state. Please contact the system administrator.",
    confirmDeleteCity: "Are you sure you want to delete this city?",
    noPermissionDeleteCity: "You don’t have permission to delete this city.",
    noPermissionEditState: "You don’t have permission to edit this state. Please contact the system administrator.",
    quickSearchPlaceholder: "Quick search",
  };

export const LABELS={
  add: "Add",
  update: "Update",
  delete: "Delete",
  cancel: "Cancel",
  save: "Save",
  close: "Close",
  submit: "Submit",
  edit: "Edit",
  date: "Date",
  status: "Status",
  userNames: "Username",
  permissions: "Permissions",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phone: "Phone",
  none: "None",
  flag: "Flag",
  countryName: "Country Name",
  region: "Region",
  population: "Population",
  actions: "Actions",
  approving: "Approving...",
  cityName: "City Name",
  permissionsHistory: "Permissions History:",
  requestedPermissions: "Requested Permissions",
  login: 'Login',
  signUp: 'Sign Up',
  profile: 'Profile',
  userName: 'Username',
  name: 'Name',
  role: 'Role',
  personalDetails: 'Personal Details',
  states: 'States',
  users: 'Users',
  logout: 'Logout',
  editing: 'Editing:',
  loading: 'Loading...',
}

export const PERSONAL_TEXT = {
  currentPermissionsTitle: "Current Permissions for {username}:",

  // PermissionRequestsPopup.tsx
  permissionRequestsDialogTitle: "Pending Permission Requests for {username}",
  noPermissionRequestsFound: "No permission requests found for this user.",
  
  // PermissionRequestsHistory.tsx
  noPermissionRequestsFoundHistory: "No permission requests found.",

  // SendPermissionRequestPopup.tsx
  sendPermissionRequestDialogTitle: "Send Permission Request",
  selectPermissionPrompt: "Please select the permission you would like to request:",
  noPermissionOptionsMessage: "You already have all the permissions or a pending request exists.",
  requestPermissionLabel: (option: string) => `Request '${option}' Permission`,
  byText: " by ",
  updatedText: "Updated:",
  
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
};

export const STATE_FORM_TEXT = {
  addStateTitle: 'Add New State',
  editStateTitlePrefix: 'Edit State: ',
  stateNameLabel: 'State Name',
  flagUrlLabel: 'Flag URL',
  populationLabel: 'Population',
  regionLabel: 'Region',
  regionNotFound: 'Region not found. Add it?',
  redirectMessage: 'Redirecting you back to the home page...',
  redirecting: "Redirecting you back to the home page...",
  goHomeNow: "Go to Home Now",

};


export const GNRL_TXT = {


  TOOLTIP: {
    APPROVE: 'Approve',
    DENY: 'Deny',
  },

};

export const VALID_MSG = {
  flagUrl: 'Flag must be a valid URL',
  populationMin: 'Population cannot be less than 0',
  regionExists: 'Region must be one of the predefined options or a newly added one',
  nameMin: 'Name must be at least 3 characters long',
  nameContain: 'Name can only contain letters from any language, spaces, and hyphens',
  nameMax: 'Name must not exceed 30 characters',
  requiredFiled: (field: string) => `${field} is required`,
  userName: 'Username must be at least 4 characters',
  email: 'Invalid email format',
  phoneOnlyNumbers: 'Phone must contain only numbers',
  passwordMin: 'Password must be at least 6 characters',
  role: 'Invalid role',
  RegionMessage: 'Invalid region name. Please use only letters and spaces.',
};

export const BUTTON  = {
  approve : "Approve",
  close : "Close",
  edit : "Edit",
  delete : "Delete",
  viewCities : "View Cities",
  editDetails : "Edit Details",
  save : "Save",
  cancel : "Cancel",
  addRegion : 'Add "{newRegion}" as a new region',

  sendPermissionRequest : "Send Permission Request",

  submitRequest : "Submit Request",
  submitAdd: 'Add State',
  submitUpdate: 'Update State',


  goHome: 'Go to Home Now',
  reload: "Reload Page",
}

export const DIALOG = {
  confirmTitleDelete: 'Confirm Deletion',
  confirmTextDelete: 'Are you sure you want to delete this user? This action will mark the user as inactive and remove them from the list.',
  unsavedChangesTitle: 'Unsaved Changes',
  unsavedChangesMessage: 'You have unsaved changes. Are you sure you want to discard them and exit?',
  dialogStay : 'Stay',
  dialogDiscard: 'Discard and Exit',
}

export const ERROR = {
  get: (field: string) => `Error getting ${field}`,
  update: (field: string) => `Error updating ${field}`,
  create: (field: string) => `Error creating ${field}`,
  delete: (field: string) => `Error deleting ${field}`,
  loading:  (field: string) => `Error loading ${field}`,
  save: (field: string) => `Error saving ${field}`,
  notFound: 'Not Found',
  permission: 'You don’t have permission to perform this action. Please contact the system administrator.',
  request: 'Error requesting data.',
  submit: 'Error submitting the form.',
  boundaryTitle: "Oops! Something went wrong.",
  boundaryMessage: "An unexpected error occurred. Please try refreshing the page.",
  noUserFound: "No user found",
  permissionRequestMessage: "There was an error sending your permission request. Please try again later.",
  loadingPermissions: "Error loading permission requests.",
}

export const SUCCESS = {
  permissionRequestMessage: "Your permission request has been sent successfully! Thank you.",
  updateMessage: 'State updated successfully!',
  addMessage: 'State added successfully!',
  addRegionMessage: 'Region "{newRegion}" added successfully!',
  deleteMessage: 'deleted successfully!',
}

export const OPTION={
    create: (field: string) => `Add New ${field}`,
    edit: (field: string) => `Edit ${field}`,
    delete: (field: string) => `Delete ${field}`,
}
// src/constants/PGS_TXT.ts
const GNRL_TXT = {
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
  
export default GNRL_TXT;
  
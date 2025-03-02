// src/components/personalTxt.ts
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
  
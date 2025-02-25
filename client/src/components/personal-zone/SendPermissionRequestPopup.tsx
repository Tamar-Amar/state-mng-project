import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useCreateRequestPermission, useUserPermissionRequests } from '../../hooks/usePermissions';
import { PermissionOption, getAvailablePermissionOptions, buildPermissionsObject } from '../../utils/permissionRequestUtils';

interface SendPermissionRequestPopupProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  currentPermissions: {
    canAdd: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  };
}
const SendPermissionRequestPopup: React.FC<SendPermissionRequestPopupProps> = ({
  open,
  onClose,
  userId,
  currentPermissions,
}) => {
  const { data: existingRequests } = useUserPermissionRequests(userId);
  const availableOptions = getAvailablePermissionOptions(currentPermissions, existingRequests);
  const hasAvailableOptions = availableOptions.length > 0;
  const [selectedOption, setSelectedOption] = useState<PermissionOption>(availableOptions[0] || 'add');
  const { mutate: sendPermissionRequest } = useCreateRequestPermission(userId);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSubmit = () => {
    if (!hasAvailableOptions) {
      setSnackbarMessage('You already have the requested permissions or a pending request exists.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const permissions = buildPermissionsObject(selectedOption);
    sendPermissionRequest(permissions, {
      onSuccess: () => {
        setSnackbarMessage('Your permission request has been sent successfully! Thank you.');
        setSnackbarSeverity('success');
        onClose();
        setSnackbarOpen(true);
      },
      onError: (error) => {
        console.error('Error sending permission request:', error);
        setSnackbarMessage('There was an error sending your permission request. Please try again later.');
        setSnackbarSeverity('error');
        onClose();
        setSnackbarOpen(true);
      },
    });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Send Permission Request</DialogTitle>
        <DialogContent>
          {hasAvailableOptions ? (
            <Typography variant="body1" sx={{ mb: 2 }}>
              Please select the permission you would like to request:
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ mb: 2 }}>
              You already have all the permissions or a pending request exists.
            </Typography>
          )}
          {hasAvailableOptions && (
            <FormControl component="fieldset">
              <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value as PermissionOption)}>
                {availableOptions.map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={`Request '${option}' Permission`} />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          {hasAvailableOptions && (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit Request
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SendPermissionRequestPopup;

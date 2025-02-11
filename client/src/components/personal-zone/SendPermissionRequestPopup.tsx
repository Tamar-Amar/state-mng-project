// src/components/personal-zone/SendPermissionRequestPopup.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
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

  const [availableOptions, setAvailableOptions] = useState<PermissionOption[]>([]);
  
  useEffect(() => {
    const options = getAvailablePermissionOptions(currentPermissions, existingRequests);
    setAvailableOptions(options);
  }, [currentPermissions, existingRequests]);
  
  const hasAvailableOptions = availableOptions.length > 0;

  const [selectedOption, setSelectedOption] = useState<PermissionOption>(availableOptions[0] || 'add');

  useEffect(() => {
    if (availableOptions.length > 0) {
      setSelectedOption(availableOptions[0]);
    }
  }, [availableOptions]);

  const { mutate: sendPermissionRequest } = useCreateRequestPermission();
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
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            p: 3,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #fdfbfb, #ebedee)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        }}
      >
        <DialogTitle sx={{ mb: 1, color: '#333' }}>Send Permission Request</DialogTitle>
        <DialogContent>
          {hasAvailableOptions ? (
            <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
              Please select the permission you would like to request:
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
              You already have all the permissions or a pending request exists.
            </Typography>
          )}
          {hasAvailableOptions && (
            <FormControl component="fieldset" sx={{ pl: 1 }}>
              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value as PermissionOption)}
              >
                {availableOptions.map((option) => {
                  let label = '';
                  if (option === 'add') label = "Request 'Add' Permission";
                  else if (option === 'update') label = "Request 'Update' Permission";
                  else if (option === 'delete') label = "Request 'Delete' Permission";
                  else if (option === 'all') label = "Request All Permissions";
                  return (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color="primary" />}
                      label={label}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions sx={{ mt: 1 }}>
          <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none', mr: 1 }}>
            Cancel
          </Button>
          {hasAvailableOptions && (
            <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ textTransform: 'none' }}>
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
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SendPermissionRequestPopup;

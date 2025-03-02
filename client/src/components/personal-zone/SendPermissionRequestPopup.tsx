// src/components/personal-zone/SendPermissionRequestPopup.tsx
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
import { BUTTON, ERROR, PERSONAL_TEXT, SUCCESS } from '../../constants/componentsTxt';

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
      setSnackbarMessage(PERSONAL_TEXT.noPermissionOptionsMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const permissions = buildPermissionsObject(selectedOption);
    sendPermissionRequest(permissions, {
      onSuccess: () => {
        setSnackbarMessage(SUCCESS.successPermissionRequestMessage);
        setSnackbarSeverity('success');
        onClose();
        setSnackbarOpen(true);
      },
      onError: (error) => {
        console.error('Error sending permission request:', error);
        setSnackbarMessage(ERROR.permissionRequestMessage);
        setSnackbarSeverity('error');
        onClose();
        setSnackbarOpen(true);
      },
    });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{PERSONAL_TEXT.sendPermissionRequestDialogTitle}</DialogTitle>
        <DialogContent>
          {hasAvailableOptions ? (
            <Typography variant="body1" sx={{ mb: 2 }}>
              {PERSONAL_TEXT.selectPermissionPrompt}
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ mb: 2 }}>
              {PERSONAL_TEXT.noPermissionOptionsMessage}
            </Typography>
          )}
          {hasAvailableOptions && (
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value as PermissionOption)}
              >
                {availableOptions.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={PERSONAL_TEXT.requestPermissionLabel(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            {BUTTON.cancel}
          </Button>
          {hasAvailableOptions && (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {BUTTON.submitRequest}
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

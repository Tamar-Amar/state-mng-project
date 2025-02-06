// src/components/personal-zone/SendPermissionRequestPopup.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface SendPermissionRequestPopupProps {
  open: boolean;
  onClose: () => void;
}

const SendPermissionRequestPopup: React.FC<SendPermissionRequestPopupProps> = ({ open, onClose }) => {
  // Local state for the permission request form (if needed)
  const [canAdd, setCanAdd] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    // Here you would call your mutation or API to send the permission request.
    // For example, you could call a hook such as useRequestPermission.
    console.log('Sending request:', { canAdd, canUpdate, canDelete, notes });
    // After sending, close the popup.
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Send Permission Request</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Please select the permissions you would like to request:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* For simplicity, we use TextField as a placeholder. In a real form, you might use checkboxes or switches */}
          <FormControlLabel
            control={
                <Checkbox
                checked={canAdd}
                onChange={(e) => setCanAdd(e.target.checked)}
                color="primary"
                />
            }
            label="Request Can Add"
            />
            <FormControlLabel
            control={
                <Checkbox
                checked={canUpdate}
                onChange={(e) => setCanUpdate(e.target.checked)}
                color="primary"
                />
            }
            label="Request Can Update"
            />

            <FormControlLabel
            control={
                <Checkbox
                checked={canDelete}
                onChange={(e) => setCanDelete(e.target.checked)}
                color="primary"
                />
            }
            label="Request Can Delete"
            />

        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendPermissionRequestPopup;

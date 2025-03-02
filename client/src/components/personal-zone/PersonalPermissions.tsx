// src/components/personal-zone/PermissionsHistory.tsx
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import CurrentPermissionsSummary from './CurrentPermissionsSummary';
import PermissionRequestsHistory from './PermissionRequestsHistory';
import SendPermissionRequestPopup from './SendPermissionRequestPopup';
import SendIcon from '@mui/icons-material/Send';
import { BUTTON, PERSONAL_TEXT } from '../../constants/componentsTxt';

interface PermissionsHistoryProps {
  userId: string;
  username: string;
  currentPermissions: {
    canAdd: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  };
}

const PersonalPermissions: React.FC<PermissionsHistoryProps> = ({ userId, username, currentPermissions }) => {
  const [openSendPopup, setOpenSendPopup] = useState(false);
  
  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: 'auto' }}>
      
      <CurrentPermissionsSummary username={username} currentPermissions={currentPermissions} />
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<SendIcon />}
          onClick={() => setOpenSendPopup(true)}
          sx={{
            textTransform: 'none',
            fontSize: '0.9rem',
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              borderColor: 'primary.main',
            },
          }}
        >
          {BUTTON.sendPermissionRequest}
        </Button>
      </Box>
      
      <PermissionRequestsHistory userId={userId} />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <SendPermissionRequestPopup
          open={openSendPopup}
          onClose={() => setOpenSendPopup(false)}
          userId={userId}
          currentPermissions={currentPermissions}
        />
      </Box>
    </Box>
  );
};

export default PersonalPermissions;

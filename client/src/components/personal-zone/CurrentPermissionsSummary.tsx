// src/components/personal-zone/CurrentPermissionsSummary.tsx
import React from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

interface CurrentPermissionsSummaryProps {
  username: string;
  currentPermissions: {
    canAdd: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  };
}

const CurrentPermissionsSummary: React.FC<CurrentPermissionsSummaryProps> = ({ username, currentPermissions }) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Current Permissions for {username}:
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
        <Chip
          icon={<AddIcon />}
          label="Add"
          sx={{
            backgroundColor: currentPermissions.canAdd ? '#c8e6c9' : '#e0e0e0',
            color: currentPermissions.canAdd ? 'black' : '#757575',
            border: currentPermissions.canAdd ? 'none' : '1px solid #bdbdbd',
          }}
          variant="filled"
        />
        <Chip
          icon={<EditIcon />}
          label="Update"
          sx={{
            backgroundColor: currentPermissions.canUpdate ? '#c8e6c9' : '#e0e0e0',
            color: currentPermissions.canUpdate ? 'black' : '#757575',
            border: currentPermissions.canUpdate ? 'none' : '1px solid #bdbdbd',
          }}
          variant="filled"
        />
        <Chip
          icon={<DeleteIcon />}
          label="Delete"
          sx={{
            backgroundColor: currentPermissions.canDelete ? '#c8e6c9' : '#e0e0e0',
            color: currentPermissions.canDelete ? 'black' : '#757575',
            border: currentPermissions.canDelete ? 'none' : '1px solid #bdbdbd',
          }}
          variant="filled"
        />
      </Box>

    </Paper>
  );
};

export default CurrentPermissionsSummary;

// src/components/personal-zone/PermissionsHistory.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Chip,
  Button,
} from '@mui/material';
import { useUserPermissionRequests } from '../../hooks/usePermissions';
import { PermissionRequestFromServer } from '../../types';
import styles from '../../styles/PermissionsHistory.module.scss';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SendPermissionRequestPopup from './SendPermissionRequestPopup';

interface PermissionsHistoryProps {
  userId: string;
  username: string;
  currentPermissions: {
    canAdd: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  };
}

const PermissionsHistory: React.FC<PermissionsHistoryProps> = ({
  userId,
  username,
  currentPermissions,
}) => {
  
  const { data, isLoading, error } = useUserPermissionRequests(userId);
  const [openSendPopup, setOpenSendPopup] = useState(false);

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: 'auto'}}>
      {/* Current Permissions Summary */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Permissions for {username}:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt:3}}>
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={() => setOpenSendPopup(true)}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#115293',
            },
          }}
        >
          Send Permission Request
        </Button>
      </Box>
      </Paper>


      <Typography variant="h6" gutterBottom>
        Permissions History:
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          Error loading permission requests.
        </Typography>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Requested Permissions</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((record: PermissionRequestFromServer) => {
                  const requestedPermissions = record.requestedPermissions || { canAdd: false, canUpdate: false, canDelete: false };
                  // Determine the status class
                  let statusClass = '';
                  if (record.status === 'approved') {
                    statusClass = styles.approved;
                  } else if (record.status === 'pending') {
                    statusClass = styles.pending;
                  } else if (record.status === 'denied') {
                    statusClass = styles.denied;
                  }
                  return (
                    <TableRow key={record._id}>
                      <TableCell>{new Date(record.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {[
                          requestedPermissions.canAdd ? 'Add' : '',
                          requestedPermissions.canUpdate ? 'Update' : '',
                          requestedPermissions.canDelete ? 'Delete' : '',
                        ]
                          .filter(Boolean)
                          .join(', ') || 'None'}
                      </TableCell>
                      <TableCell>
                        <span className={`${styles.statusCell} ${statusClass}`}>
                          {record.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No permission requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      <SendPermissionRequestPopup open={openSendPopup} onClose={() => setOpenSendPopup(false)} />
    </Box>
  );
};

export default PermissionsHistory;

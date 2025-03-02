// src/pages/UsersPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Tooltip,
  Avatar,
} from '@mui/material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { useUsers, useDeleteUser } from '../hooks/useUsers';
import { User } from '../types';
import PermissionRequestsPopup from '../components/personal-zone/PendingPermissionRequestsPopup';
import { usePendingRequests } from '../hooks/usePermissions';
import {GNRL_TXT} from '../constants/componentsTxt';
import USER_TXT from '../constants/pages/userPageTxt';

const UsersPage: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [permPopupOpen, setPermPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: pendingRequests, isLoading: isLoadingRequests } = usePendingRequests();

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setConfirmOpen(true);
  };

  const handleViewPermissions = (user: User) => {
    if (!pendingRequests || isLoadingRequests) return;
    setSelectedUser(user);
    setPermPopupOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete, {
        onSuccess: () => {
          setSnackbarOpen(true);
          setConfirmOpen(false);
          setUserToDelete(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setUserToDelete(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 15 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 15 }}>
        {GNRL_TXT.ERROR.LOAD('users')}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: 'auto', mt: 15 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {USER_TXT.PAGE_TITLE}
      </Typography>
      <Paper sx={{ mt: 2, overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{GNRL_TXT.USER_PROP.PROFILE}</TableCell>
              <TableCell>{GNRL_TXT.USER_PROP.USERNAME}</TableCell>
              <TableCell>{GNRL_TXT.USER_PROP.NAME}</TableCell>
              <TableCell>{GNRL_TXT.USER_PROP.EMAIL}</TableCell>
              <TableCell>{GNRL_TXT.USER_PROP.ROLE}</TableCell>
              <TableCell>{GNRL_TXT.USER_PROP.PERMISSIONS}</TableCell>
              <TableCell align="center">{USER_TXT.TABLE.ACTIONS}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Avatar 
                      src={user.profilePicture || ""}
                      alt={user.username}
                      sx={{ width: 40, height: 40 }}
                    >
                      {!user.profilePicture && user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.permissions
                      ? `${user.permissions.canAdd ? 'Add, ' : ''}${
                          user.permissions.canUpdate ? 'Update, ' : ''
                        }${user.permissions.canDelete ? 'Delete' : ''}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={USER_TXT.TOOLTIP_VIEW_PERMISSIONS}>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewPermissions(user)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(user._id as string)}
                      disabled={!user.isActive}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>{GNRL_TXT.DIALOG.CONFIRM_TITLE_DLT}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {GNRL_TXT.DIALOG.CONFIRM_TEXT_DLT}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} variant="outlined">
            {GNRL_TXT.BUTTON.CANCEL}
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            {GNRL_TXT.BUTTON.DELETE}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={GNRL_TXT.SNACKBAR.DELETE_SUCCESS}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {selectedUser && (
        <PermissionRequestsPopup
          open={permPopupOpen}
          onClose={() => setPermPopupOpen(false)}
          userId={selectedUser._id || 'unknown'}
          username={selectedUser.username || 'unknown'}
        />
      )}
    </Box>
  );
};

export default UsersPage;

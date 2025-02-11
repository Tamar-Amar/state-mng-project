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
  Avatar
} from '@mui/material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { useUsers, useDeleteUser } from '../hooks/useUsers';
import { User } from '../types';
import PermissionRequestsPopup from '../components/personal-zone/PendingPermissionRequestsPopup';
import { usePendingRequests } from '../hooks/usePermissions';

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
        Error loading users.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 , maxWidth: 900, mx: 'auto', mt:15}}>
      <Typography variant="h4" align="center" gutterBottom>
        Users List
      </Typography>
      <Paper sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Profile</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell align="center">Actions</TableCell>
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
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
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
                  <Tooltip title="View Permission Requests">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewPermissions(user || 'not-found')}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(user._id || 'not-found')}
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
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action will mark the user as inactive and remove them from the list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="User deleted successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {selectedUser && (
        <PermissionRequestsPopup
          open={permPopupOpen}
          onClose={() => setPermPopupOpen(false)}
          userId={selectedUser?._id || 'unknown'}
          username={selectedUser?.username|| 'unknown'}
        />
      )}
    </Box>
  );
};

export default UsersPage;

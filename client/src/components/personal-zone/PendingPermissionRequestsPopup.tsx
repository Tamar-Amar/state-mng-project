// src/components/PermissionRequestsPopup.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
} from '@mui/material';
import { usePendingRequests } from '../../hooks/usePermissions';
import {PermissionRequestFromServer } from '../../types';

interface PermissionRequestsPopupProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  username: string;
}

const PermissionRequestsPopup: React.FC<PermissionRequestsPopupProps> = ({
  open,
  onClose,
  userId,
  username,
}) => {
    const { data, isLoading, error } = usePendingRequests();
    console.log("re",data);
    const userRequests: PermissionRequestFromServer[] = (data as PermissionRequestFromServer[])?.filter(
      (req) => req.user._id === userId
    ) || [];

  const formatPermissions = (requestedPermissions: PermissionRequestFromServer['requestedPermissions']) => {
    const perms: string[] = [];
    if (requestedPermissions.canAdd) perms.push('Add');
    if (requestedPermissions.canUpdate) perms.push('Update');
    if (requestedPermissions.canDelete) perms.push('Delete');
    return perms.join(', ') || 'None';
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Pending Permission Requests for {username}</DialogTitle>
      <DialogContent>
        {isLoading && <CircularProgress />}
        {error ? (
        <Typography color="error">
            Error loading permission requests.
        </Typography>
        ) : null}
        {data && userRequests.length === 0 && (
          <DialogContentText>
            No permission requests found for this user.
          </DialogContentText>
        )}
        {data && userRequests.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Requested Permissions</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{formatPermissions(request.requestedPermissions)}</TableCell>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionRequestsPopup;

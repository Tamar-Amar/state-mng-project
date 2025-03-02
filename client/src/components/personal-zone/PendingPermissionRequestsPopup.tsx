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
import { useApprovePermission, useFilteredUserRequests } from '../../hooks/usePermissions';
import { PermissionRequestFromServer } from '../../types';
import { PERSONAL_TEXT } from '../../constants/componentsTxt';

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
  const userPendingRequest = useFilteredUserRequests(userId);
  
  const approveMutation = useApprovePermission();

  const formatPermissions = (requestedPermissions: PermissionRequestFromServer['requestedPermissions']) => {
    const perms: string[] = [];
    if (requestedPermissions.canAdd) perms.push(PERSONAL_TEXT.chipAdd);
    if (requestedPermissions.canUpdate) perms.push(PERSONAL_TEXT.chipUpdate);
    if (requestedPermissions.canDelete) perms.push(PERSONAL_TEXT.chipDelete);
    return perms.join(', ') || 'None';
  };

  const handleApprove = (requestId: string, requestedPermissions: PermissionRequestFromServer['requestedPermissions']) => {
    approveMutation.mutate(
      {
        id: requestId,
        approvals: requestedPermissions,
      },
      {
        onSuccess: () => {
        },
        onError: (error) => {
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {PERSONAL_TEXT.permissionRequestsDialogTitle.replace('{username}', username)}
      </DialogTitle>
      <DialogContent>
        {userPendingRequest.length === 0 && (
          <DialogContentText>
            {PERSONAL_TEXT.noPermissionRequestsFound}
          </DialogContentText>
        )}
        {userPendingRequest.length > 0 && (
          <DialogContentText>
            {PERSONAL_TEXT.noPermissionRequestsFound}
          </DialogContentText>
        )}
        {userPendingRequest && userPendingRequest.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{PERSONAL_TEXT.tableHeaderDate}</TableCell>
                <TableCell>{PERSONAL_TEXT.tableHeaderRequestedPermissions}</TableCell>
                <TableCell>{PERSONAL_TEXT.tableHeaderStatus}</TableCell>
                <TableCell>{PERSONAL_TEXT.tableHeaderAction}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userPendingRequest.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{formatPermissions(request.requestedPermissions)}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.status === 'pending' && (
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() =>
                          handleApprove(request._id as string, request.requestedPermissions)
                        }
                        disabled={approveMutation.isPending}
                      >
                        {approveMutation.isPending
                          ? PERSONAL_TEXT.approvingText
                          : PERSONAL_TEXT.approveButton}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          {PERSONAL_TEXT.closeButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionRequestsPopup;

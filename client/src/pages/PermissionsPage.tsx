// src/pages/PermissionsPage.tsx
import React from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Divider, 
  CircularProgress, 
  TableCell, 
  TableRow, 
  TableBody, 
  Table, 
  TableHead, 
  Tooltip, 
  IconButton 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { usePendingRequests, useApprovePermission, useDenyPermission } from '../hooks/usePermissions';
import { PermissionRequestFromServer } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import PERM_TXT from '../constants/pages/permissonPageTxt';
import GNRL_TXT from '../constants/generalTxt';

const PermissionsPage: React.FC = () => {
  const { data: pendingRequests = [], isLoading, error } = usePendingRequests();
  const approveMutation = useApprovePermission();
  const denyMutation = useDenyPermission();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {GNRL_TXT.ERROR.LOAD('permission requests')}
      </Typography>
    );
  }

  const groupedByUser: Record<string, PermissionRequestFromServer[]> = pendingRequests.reduce((acc, request) => {
    if (!acc[request.user._id]) {
      acc[request.user._id] = [];
    }
    acc[request.user._id].push(request);
    return acc;
  }, {} as Record<string, PermissionRequestFromServer[]>);

  const handleApprove = (request: PermissionRequestFromServer) => {
    approveMutation.mutate(
      { id: request._id as string, approvals: request.requestedPermissions },
      {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingPermissionRequests'] }),
      }
    );
  };

  const handleDeny = (requestId: string) => {
    denyMutation.mutate(requestId, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['permissionRequests'] }),
    });
  };

  const formatPermissions = (permissions: PermissionRequestFromServer['requestedPermissions']) => {
    const perms: string[] = [];
    if (permissions.canAdd) perms.push('Add');
    if (permissions.canUpdate) perms.push('Update');
    if (permissions.canDelete) perms.push('Delete');
    return perms.join(', ') || 'None';
  };

  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', padding: 3, mt: 13 }}>
      <Typography variant="h4" gutterBottom align="center">
        {PERM_TXT.PAGE_TITLE}
      </Typography>

      {Object.keys(groupedByUser).length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          {PERM_TXT.NO_PENDING}
        </Typography>
      ) : (
        Object.entries(groupedByUser).map(([userId, requests]) => (
          <Card key={userId} sx={{ mb: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {PERM_TXT.USER_LABEL} {requests[0].user.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {PERM_TXT.USER_ID_LABEL} {userId}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{PERM_TXT.TABLE.DATE}</TableCell>
                    <TableCell>{PERM_TXT.TABLE.REQUESTED_PERMISSIONS}</TableCell>
                    <TableCell>{PERM_TXT.TABLE.STATUS}</TableCell>
                    <TableCell>{PERM_TXT.TABLE.ACTIONS}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((request: PermissionRequestFromServer) => (
                      <TableRow key={request._id}>
                        <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{formatPermissions(request.requestedPermissions)}</TableCell>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>
                          {request.status === 'pending' && (
                            <>
                              <Tooltip title={GNRL_TXT.TOOLTIP.APPROVE}>
                                <IconButton 
                                  color="success" 
                                  onClick={() => handleApprove(request)}
                                  disabled={approveMutation.isPending}
                                >
                                  <CheckCircleIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={GNRL_TXT.TOOLTIP.DENY}>
                                <IconButton 
                                  color="error" 
                                  onClick={() => handleDeny(request._id as string)}
                                  disabled={denyMutation.isPending}
                                >
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default PermissionsPage;

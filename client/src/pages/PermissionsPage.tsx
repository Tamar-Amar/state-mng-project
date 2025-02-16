import React from 'react';
import { usePendingRequests, useApprovePermission, useDenyPermission } from '../hooks/usePermissions';
import { PermissionRequestFromServer } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Button, Card, CardContent, Typography, Divider, CircularProgress, TableCell, TableRow, TableBody, Table, TableHead, Tooltip, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
        Error loading permission requests.
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
      { id: request._id || "unde", approvals: request.requestedPermissions },
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
        Pending Permission Requests
      </Typography>

      {Object.keys(groupedByUser).length === 0 ? (
      <Typography variant="h6" align="center" color="textSecondary">
        No pending requests.
      </Typography>
    ) : (
      Object.entries(groupedByUser).map(([userId, requests]) => (
        <Card key={userId} sx={{ mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6">User: {requests[0].user.username}</Typography>
            <Typography variant="body2" color="textSecondary">User ID: {userId}</Typography>
            <Divider sx={{ my: 2 }} />

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Requested Permissions</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // מיון מהחדש לישן
                  .map((request: PermissionRequestFromServer) => (
                    <TableRow key={request._id}>
                      <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{formatPermissions(request.requestedPermissions)}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>
                        {request.status === 'pending' && (
                          <>
                            <Tooltip title="Approve">
                              <IconButton 
                                color="success" 
                                onClick={() => handleApprove(request)}
                                disabled={approveMutation.isPending}
                              >
                                <CheckCircleIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Deny">
                              <IconButton 
                                color="error" 
                                onClick={() => handleDeny(request._id || "undefined")}
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
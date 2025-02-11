import React from 'react';
import { usePendingRequests, useApprovePermission, useDenyPermission } from '../hooks/usePermissions';
import { PermissionRequestFromServer } from '../types';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Button, Card, CardContent, Typography, Divider } from '@mui/material';

const PermissionsPage: React.FC = () => {
  const { data: pendingRequests = [], isLoading, error } = usePendingRequests();
  const approveMutation = useApprovePermission();
  const denyMutation = useDenyPermission();
  const queryClient = useQueryClient();

  if (isLoading) return <Typography>Loading pending requests...</Typography>;
  if (error) return <Typography color="error">Error loading requests</Typography>;

  // קיבוץ לפי משתמש
  const groupedByUser: Record<string, PermissionRequestFromServer[]> = pendingRequests.reduce((acc, request) => {
    if (!acc[request.user._id]) {
      acc[request.user._id] = [];
    }
    acc[request.user._id].push(request);
    return acc;
  }, {} as Record<string, PermissionRequestFromServer[]>);

  // פונקציה לאישור בקשה
  const handleApprove = (requestId: string) => {
    approveMutation.mutate(requestId, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['permissionRequests'] }),
    });
  };

  // פונקציה לדחיית בקשה
  const handleDeny = (requestId: string) => {
    denyMutation.mutate(requestId, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['permissionRequests'] }),
    });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>Pending Permission Requests</Typography>
      
      {Object.entries(groupedByUser).map(([userId, requests]) => (
        <Card key={userId} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">User: {requests[0].user.username}</Typography>
            <Typography variant="body2" color="textSecondary">ID: {userId}</Typography>
            <Divider sx={{ my: 1 }} />

            {requests
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // מיון מהחדש לישן
              .map((request: PermissionRequestFromServer) => (
                <Box key={request._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
                  {/* <Typography>{request.permissionType}</Typography> */}
                  <Box>
                    <Button 
                      variant="contained" 
                      color="success" 
                      size="small" 
                      sx={{ mr: 1 }}
                      onClick={() => handleApprove(request._id || "undefined")}
                      disabled={approveMutation.isPending}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error" 
                      size="small" 
                      onClick={() => handleDeny(request._id|| "undefined")}
                      disabled={denyMutation.isPending}
                    >
                      Deny
                    </Button>
                  </Box>
                </Box>
              ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PermissionsPage;

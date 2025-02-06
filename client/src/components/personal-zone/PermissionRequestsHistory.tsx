// src/components/personal-zone/PermissionRequestsHistory.tsx
import React from 'react';
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
} from '@mui/material';
import { useUserPermissionRequests } from '../../hooks/usePermissions';
import { PermissionRequestFromServer } from '../../types';
import styles from '../../styles/PermissionsHistory.module.scss';

interface PermissionRequestsHistoryProps {
  userId: string;
}

const PermissionRequestsHistory: React.FC<PermissionRequestsHistoryProps> = ({ userId }) => {
  const { data, isLoading, error } = useUserPermissionRequests(userId);

  return (
    <Paper sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>
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
                const requestedPermissions =
                  record.requestedPermissions || { canAdd: false, canUpdate: false, canDelete: false };
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
                        {record.status === 'approved' && record.reviewedBy && (
                          <> by {record.reviewedBy.username}</>
                        )}
                        {record.status !== 'pending' && (
                          <>
                            <br />
                            Updated: {new Date(record.updatedAt).toLocaleDateString()}
                          </>
                        )}
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
      )}
    </Paper>
  );
};

export default PermissionRequestsHistory;

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
import { PermissionRequestFromServer } from '../../types';
import styles from '../../styles/PermissionsHistory.module.scss';
import { useUserPermissionRequests } from '../../hooks/usePermissions';
import { ERROR, LABELS, PERSONAL_TEXT } from '../../constants/componentsTxt';

interface PermissionRequestsHistoryProps {
  userId: string;
}

const PermissionRequestsHistory: React.FC<PermissionRequestsHistoryProps> = ({ userId }) => {
  const { data, isLoading, error } = useUserPermissionRequests(userId);

  return (
    <Paper sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>
        {LABELS.permissionsHistory}
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {ERROR.loadingPermissions}
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{LABELS.date}</TableCell>
              <TableCell>{LABELS.requestedPermissions}</TableCell>
              <TableCell>{LABELS.status}</TableCell>
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
                const permissionsText = [
                  requestedPermissions.canAdd ? LABELS.add: '',
                  requestedPermissions.canUpdate ? LABELS.update : '',
                  requestedPermissions.canDelete ? LABELS.delete : '',
                ]
                  .filter(Boolean)
                  .join(', ') || LABELS.none;
                return (
                  <TableRow key={record._id}>
                    <TableCell>{new Date(record.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{permissionsText}</TableCell>
                    <TableCell>
                      <span className={`${styles.statusCell} ${statusClass}`}>
                        {record.status}
                        {(record.status === 'approved' || record.status === 'denied') && record.reviewedBy && (
                          <> {PERSONAL_TEXT.byText}{record.reviewedBy.username}</>
                        )}
                        {record.status !== 'pending' && (
                          <>
                            <br />
                            {PERSONAL_TEXT.updatedText} {new Date(record.updatedAt).toLocaleDateString()}
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
                  {PERSONAL_TEXT.noPermissionRequestsFoundHistory}
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

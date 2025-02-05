// src/components/PermissionsHistory.tsx
import React from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const PermissionsHistory: React.FC = () => {
  const permissionHistory = [
    { date: '2024-01-01', permission: 'Admin Access', status: 'Approved' },
    { date: '2024-02-15', permission: 'Edit Profile', status: 'Pending' },
    { date: '2024-03-20', permission: 'View Reports', status: 'Denied' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
      Permissions History:
      </Typography>
      <Paper sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Permission</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissionHistory.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.permission}</TableCell>
                <TableCell>{record.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default PermissionsHistory;

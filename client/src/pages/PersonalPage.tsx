import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userAtom } from '../store/userAtom';
import { User } from '../types/User';

const PersonalPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [user, setUser] = useRecoilState<User | null>(userAtom);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User>(user || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user',
    profilePicture: '',
    joinDate: new Date(),
    username:   '',
  });
  

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData as User); 
    setEditMode(false);
  };

  const permissionHistory = [
    { date: '2024-01-01', permission: 'Admin Access', status: 'Approved' },
    { date: '2024-02-15', permission: 'Edit Profile', status: 'Pending' },
    { date: '2024-03-20', permission: 'View Reports', status: 'Denied' },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="פרטים אישיים" />
        <Tab label="הרשאות" />
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={{ mt: 3 }}>
          {!editMode ? (
            <>
              <Typography variant="h6">שם: {user?.firstName} {user?.lastName}</Typography>
              <Typography>דוא"ל: {user?.email}</Typography>
              <Typography>טלפון: {user?.phone}</Typography>
              <Button variant="contained" onClick={() => setEditMode(true)} sx={{ mt: 2 }}>
                ערוך פרטים
              </Button>
            </>
          ) : (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField name="firstName" label="שם פרטי" value={formData.firstName || ''} onChange={handleInputChange} />
              <TextField name="lastName" label="שם משפחה" value={formData.lastName || ''} onChange={handleInputChange} />
              <TextField name="email" label="דוא" value={formData.email || ''} onChange={handleInputChange} />
              <TextField name="phone" label="טלפון" value={formData.phone || ''} onChange={handleInputChange} />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={handleSave}>שמור</Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>ביטול</Button>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">היסטוריית הרשאות:</Typography>
          <Paper sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>תאריך</TableCell>
                  <TableCell>הרשאה</TableCell>
                  <TableCell>סטטוס</TableCell>
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
      )}
    </Box>
  );
};

export default PersonalPage;

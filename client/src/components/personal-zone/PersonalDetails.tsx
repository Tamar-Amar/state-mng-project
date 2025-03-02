// src/components/personal-zone/PersonalDetails.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { 
  Edit as EditIcon, 
  Save as SaveIcon, 
  Cancel as CancelIcon, 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon 
} from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { User } from '../../types';
import { useUpdateUser } from '../../hooks/useUsers';
import { userAtom } from '../../store/userAtom';
import { PERSONAL_TEXT } from './personalTxt';

const PersonalDetails: React.FC = () => {
  const [user, setUser] = useRecoilState(userAtom);

  if (!user) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6">
          {PERSONAL_TEXT.noUserFound}
        </Typography>
      </Box>
    );
  }
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'user',
    profilePicture: user?.profilePicture || '',
    joinDate: user?.joinDate || new Date(),
    username: user?.username || '',
    _id: user?._id || '',
  } as User);

  const updateUserMutation = useUpdateUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUserMutation.mutate(formData, {
      onSuccess: (updatedUser: User) => {
        setUser(updatedUser);
        setEditMode(false);
      },
      onError: (error: any) => {
        console.error('Update failed:', error);
      }
    });
  };

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      {!editMode ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 3 }}>
          <Avatar 
            src={user?.profilePicture} 
            alt={user?.username} 
            sx={{ width: 120, height: 120, margin: '0 auto' }} 
          />
          <Typography variant="h5">{user?.username}</Typography>
          <Box sx={{ width: '100%', textAlign: 'left', mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <PersonIcon color="action" />
              <Typography variant="body1">
                {user?.firstName} {user?.lastName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <EmailIcon color="action" />
              <Typography variant="body1">{user?.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PhoneIcon color="action" />
              <Typography variant="body1">{user?.phone}</Typography>
            </Box>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<EditIcon />} 
            onClick={() => setEditMode(true)} 
            sx={{ mt: 2 }}
          >
            {PERSONAL_TEXT.editDetailsButton}
          </Button>
        </Box>
      ) : (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left', mt: 2 }}>
          <Avatar 
            src={user?.profilePicture} 
            alt={user?.username} 
            sx={{ width: 120, height: 120, margin: '0 auto', mb: 2 }} 
          />
          <TextField
            name="username"
            label={PERSONAL_TEXT.labelUsername}
            value={formData.username}
            disabled
          />
          <TextField
            name="firstName"
            label={PERSONAL_TEXT.labelFirstName}
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <TextField
            name="lastName"
            label={PERSONAL_TEXT.labelLastName}
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <TextField
            name="email"
            label={PERSONAL_TEXT.labelEmail}
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            name="phone"
            label={PERSONAL_TEXT.labelPhone}
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
              {PERSONAL_TEXT.saveButton}
            </Button>
            <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => setEditMode(false)}>
              {PERSONAL_TEXT.cancelButton}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PersonalDetails;

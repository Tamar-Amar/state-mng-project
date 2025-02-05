// src/pages/PersonalPage.tsx
import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import PersonalDetails from '../components/personal-zone/PersonalDetails';
import PermissionsHistory from '../components/personal-zone/PermissionsHistory';

const PersonalPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Personal Details" />
        <Tab label="Permission" />
      </Tabs>

      {tabIndex === 0 && <PersonalDetails />}
      {tabIndex === 1 && <PermissionsHistory />}
    </Box>
  );
};

export default PersonalPage;

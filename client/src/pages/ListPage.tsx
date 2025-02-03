import React from 'react';
import StatesTable from '../components/state/StatesTable';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 3 }}>

      <StatesTable />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: "40%", marginTop: "2%"}}>
        <Button
          variant="contained"
          color="primary"
          style={{
             paddingLeft: "10%",
             paddingRight: "10%"
          }}
          onClick={() => navigate('/state-create')}
        >
          Add New State
        </Button>
      </Box>
    </Box>
  );
};

export default ListPage;

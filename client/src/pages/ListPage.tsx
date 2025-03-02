import React from 'react';
import StatesTable from '../components/state/StatesTable';
import { Button, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../store/userAtom';
import {ERROR, OPTION} from '../constants/componentsTxt';

const ListPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleAddStateClick = () => {
    if (user?.permissions?.canAdd) {
      navigate('/state-form');
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <StatesTable />

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <Button
          variant="contained"
          onClick={handleAddStateClick}
          sx={{
            paddingLeft: '10%',
            paddingRight: '10%',
            backgroundColor: user?.permissions?.canAdd ? 'primary.main' : '#e0e0e0',
            color: user?.permissions?.canAdd ? 'white' : '#757575',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: user?.permissions?.canAdd ? 'primary.dark' : '#bdbdbd',
            },
          }}
        >
          {OPTION.create('state')}
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning" onClose={() => setOpenSnackbar(false)} sx={{ fontSize: '1rem', padding: '16px 24px' , mt: '70%'}}>
          {ERROR.permission}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListPage;

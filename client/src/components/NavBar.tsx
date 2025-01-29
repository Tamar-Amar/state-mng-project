import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { editingStateAtom } from '../store/stateAtoms';

const Navbar = () => {
  const location = useLocation();
  const editingStateName = useRecoilValue(editingStateAtom); 

  return (
    <AppBar position="fixed" color="primary" elevation={3} sx={{ zIndex: 1300 }} >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          State Management Procedure
        </Typography>
        {editingStateName && (
          <Typography variant="subtitle1" sx={{ marginRight: 'auto', fontStyle: 'italic' }}>
            Editing: {editingStateName}
          </Typography>
        )}
        <Box>
          <Button
            color={location.pathname === '/operators' ? 'secondary' : 'inherit'}
            sx={{ mx: 1 }}
            href="/"
          >
            States
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Avatar, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { editingStateAtom } from '../store/stateAtoms';
import { userAtom } from '../store/userAtom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingStateName = useRecoilValue(editingStateAtom);
  const user = useRecoilValue(userAtom);

  const handleProfileClick = () => {
    navigate('/personal');
  };

  console.log(user)
  return (
    <AppBar position="fixed" color="primary" elevation={3} sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color={location.pathname === '/home' ? 'secondary' : 'inherit'}
            onClick={() => navigate('/home')}
          >
            States
          </Button>

          {user?.role === 'admin' && (
            <>
              <Button
                color={location.pathname === '/users' ? 'secondary' : 'inherit'}
                onClick={() => navigate('/users')}
              >
                Users
              </Button>

              <Button
                color={location.pathname === '/permissions' ? 'secondary' : 'inherit'}
                onClick={() => navigate('/permissions')}
              >
                Permissions
              </Button>
            </>
          )}

          <Button
            color={location.pathname === '/personal' ? 'secondary' : 'inherit'}
            onClick={() => navigate('/personal')}
          >
            Personal Details
          </Button>
        </Box>

        {editingStateName && (
          <Typography
            variant="subtitle1"
            sx={{ marginLeft: 'auto', fontStyle: 'italic', color: 'yellow' }}
          >
            Editing: {editingStateName}
          </Typography>
        )}

        {user && (
          <IconButton onClick={handleProfileClick} sx={{ cursor: 'pointer' }}>
            <Avatar
              src={user.profilePicture}
              alt={user.firstName}
              sx={{
                width: 40,
                height: 40,
                border: '2px solid white',
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                },
              }}
            />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

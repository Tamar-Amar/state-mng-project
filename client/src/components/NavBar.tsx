import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Avatar, IconButton, ListItemButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { editingStateAtom } from '../store/stateAtoms';
import { userAtom } from '../store/userAtom';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useState } from 'react';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingStateName = useRecoilValue(editingStateAtom);
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)'); 

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };


  const handleProfileClick = () => {
    navigate('/personal');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const menuItems = (
    <List sx={{ mt:10 }}>
    <ListItem disablePadding>
      <ListItemButton onClick={() => navigate('/')}>
        <ListItemText primary="States" />
      </ListItemButton>
    </ListItem>
      {user?.role === 'admin' && (
        <>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/users')}>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/permissions')}>
            <ListItemText primary="Permissions" />
          </ListItemButton>
        </ListItem>
        </>
      )}
      <Divider />
      <ListItem disablePadding>
      <ListItemButton onClick={() => navigate('/personal')}>
        <ListItemText primary="Personal Details" />
      </ListItemButton>
    </ListItem>
      {user && (
        <>
          <Divider />
          <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
        </>
      )}
    </List>
  );

  return (
    <AppBar position="fixed" color="primary" elevation={3} sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

      {isMobile ? (
          <IconButton edge="start" color="inherit" onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
        <Box sx={{ display: 'flex', gap: 2 }}>
        {user && (
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        )}
          <Button
            color={location.pathname === '/' ? 'secondary' : 'inherit'}
            onClick={() => navigate('/')}
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
      )}

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

      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        {menuItems}
      </Drawer>

    </AppBar>
  );
};

export default Navbar;

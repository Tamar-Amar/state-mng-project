import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00A6FB', 
      light: '#A5D8FF', 
      dark: '#003459',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFD700', 
      dark: '#FF6F00',
    },
    error: {
      main: '#E53935', 
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF', 
    },
    text: {
      primary: '#003459', 
      secondary: '#00A6FB', 
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700 }, 
    h2: { fontSize: '1.5rem', fontWeight: 600 }, 
    body1: { fontSize: '1rem' }, 
  },
});

export default theme;

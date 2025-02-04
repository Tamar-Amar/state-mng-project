import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import theme from './theme'; 
import { userAtom } from './store/userAtom';
import { api } from './services/apiService';
import { getCurrentUser } from './services/authService';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser()
        .then((response) => {
          setUser(response.user); 
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
          }
        });
    }
  }, []);
  

  return (
    <>
      {user && <Navbar />}
      <div style={{ paddingTop: user ? '64px' : '0' }}>
        <AppRoutes />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppContent />
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
};

export default App;

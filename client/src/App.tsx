import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import theme from './theme'; 
import { userAtom } from './store/userAtom';
import { getCurrentUser } from './services/authService';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


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
      <div style={{ marginTop: user ? '64px' : '0'}}>
        <AppRoutes />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <RecoilRoot>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppContent />
            </ThemeProvider>
          </BrowserRouter>
      </RecoilRoot>
    </ErrorBoundary>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

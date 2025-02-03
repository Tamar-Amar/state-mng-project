import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import theme from './theme'; 
import { userAtom } from './store/userAtom';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const user = useRecoilValue(userAtom); 

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

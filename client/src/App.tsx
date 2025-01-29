import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import theme from './theme'; 

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Navbar />
              <div style={{ paddingTop: '64px' }}>
                <AppRoutes />
              </div>
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
};

export default App;

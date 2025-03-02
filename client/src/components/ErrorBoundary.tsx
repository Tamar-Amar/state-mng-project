// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ERROR_BOUNDARY_TEXTS } from '../constants/componentsTxt';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            bgcolor: '#f5f5f5',
          }}
        >
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 50 }} />
            <Typography variant="h5" sx={{ mt: 2 }}>
              {ERROR_BOUNDARY_TEXTS.errorTitle}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {ERROR_BOUNDARY_TEXTS.errorMessage}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={this.handleReload}>
              {ERROR_BOUNDARY_TEXTS.reloadButton}
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

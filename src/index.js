import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'context/snackbarContext';
import { AuthProvider } from 'context/authContext';
import { FreelancerProvider } from 'context/freelancerContext';
import Intercom from 'react-intercom';
import ErrorBoundary from 'components/Errors/ErrorBoundary/ErrorBoundary';
import theme from 'theme';
import Snackbar from 'components/Shared/Utils/Snackbar';

ReactDOM.render(
  <SnackbarProvider>
    <AuthProvider>
      <FreelancerProvider>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
              <Snackbar />
              <Intercom appID={process.env.REACT_APP_INTERCOM_ID} />
            </StyledThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </FreelancerProvider>
    </AuthProvider>
  </SnackbarProvider>,
  document.getElementById('root')
);

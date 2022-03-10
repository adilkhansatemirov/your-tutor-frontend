import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import theme from 'theme';
import { SnackbarProvider } from 'context/snackbarContext';
import { AuthProvider } from 'context/authContext';
import Snackbar from 'components/Shared/Utils/Snackbar';

ReactDOM.render(
  <SnackbarProvider>
    <AuthProvider>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <App />
            <Snackbar />
          </StyledThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </AuthProvider>
  </SnackbarProvider>,
  document.getElementById('root'),
);

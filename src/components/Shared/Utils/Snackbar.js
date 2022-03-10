import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { SnackbarContext } from 'context/snackbarContext';

function SnackbarUtil() {
  const { snackbarIsOpen, hideSnackbar, snackbarMessage, snackbarType } = useContext(SnackbarContext);

  return (
    <Snackbar open={snackbarIsOpen} autoHideDuration={3000} onClose={hideSnackbar}>
      <Alert onClose={hideSnackbar} severity={snackbarType} elevation={6} variant="filled">
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarUtil;

import { useState, createContext } from 'react';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [snackbarType, setSnackbarType] = useState(null);

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarIsOpen(true);
  };

  const hideSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarIsOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbarMessage,
        snackbarType,
        snackbarIsOpen,
        showSnackbar,
        hideSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

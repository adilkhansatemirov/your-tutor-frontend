import { Box, CircularProgress } from '@material-ui/core';

function AuthLoader() {
  return (
    <Box
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
}

export default AuthLoader;

import { Box, CircularProgress } from '@material-ui/core';

function PageLoader() {
  return (
    <Box
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}

export default PageLoader;

import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
  },
  card: {
    padding: '70px 65px',
    height: 350,
    width: 750,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.silverGray.pale,
  },
  button: {
    display: 'inline-block',
    cursor: 'pointer',
  },
}));

export default function NotFound() {
  const classes = useStyle();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
      404
    </Box>
  );
}

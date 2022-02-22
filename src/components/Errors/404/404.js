import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  const handlePreviousPage = () => {
    history.goBack();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
      <Box className={classes.card}>
        <StyledTypography type="h5" fontFamily="Rubik" color="bluishBlack" fontWeight="bold">
          Not Found
        </StyledTypography>
        <StyledTypography type="h1" fontFamily="Rubik" color="bluishBlack" fontWeight="bold" fontSize={80}>
          404
        </StyledTypography>
        <StyledTypography type="text" fontFamily="Rubik" fontWeight="normal" fontSize={16}>
          Sorry, we can’t find the page you were looking for.
          <br />
          You can go back to{' '}
          <StyledTypography
            component="span"
            className={classes.button}
            color="skyBlue"
            fontSize={16}
            fontFamily="Rubik"
            fontWeight="bold"
            onClick={handlePreviousPage}
          >
            previous page
          </StyledTypography>
          .
        </StyledTypography>
      </Box>
    </Box>
  );
}

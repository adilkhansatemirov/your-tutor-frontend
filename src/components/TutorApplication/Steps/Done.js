import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { makeStyles, Box } from '@material-ui/core';

import checkIcon from 'assets/icons/check.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  icon: {
    width: '93px',
    height: '93px',
    marginBottom: '25px',
  },
}));

function Done() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <img className={classes.icon} src={checkIcon} alt="check" />
      <StyledTypography fontFamily="Rubik" fontSize={30} type="h1" fontWeight="medium" align="center">
        Your account is under review.
      </StyledTypography>
      <StyledTypography fontFamily="Rubik" fontSize={30} type="h1" fontWeight="medium" align="center">
        We will notify you via email once it's approved
      </StyledTypography>
    </Box>
  );
}

export default Done;

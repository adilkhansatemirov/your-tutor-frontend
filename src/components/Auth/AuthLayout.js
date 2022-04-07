import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import logoWhite from 'assets/images/logo.png';
// import semiTransparentBackground from 'assets/images/background-semi-transparent.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F7FB',
  },
  container: {
    display: 'flex',
    backgroundColor: '#0F2C4C',
    position: 'relative',
    borderRadius: 10,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 30,
    },
    minHeight: 600,
  },
  logoSide: {
    width: 300,
    //background: `linear-gradient(#004BA1, #004BA1)`,
    background:'#E8EDF7',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '50%',
    cursor: 'pointer',
  },
  mainSide: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 60px 40px 60px',
    width: '465px',
  },
}));

function AuthLayout({ children }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.logoSide}>
          <Link to="/" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
            <img src={logoWhite} className={classes.logo} alt="inhome-logo" />
          </Link>
        </Box>
        <Box className={classes.mainSide}>{children}</Box>
      </Box>
    </Box>
  );
}

export default AuthLayout;

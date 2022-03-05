import { makeStyles } from '@material-ui/core';

import backgroundImg from 'assets/images/background.jpg';

export default makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: '139px',
    height: '68px',
    [theme.breakpoints.down('xs')]: {
      width: '82px',
      height: '40px',
    },
  },
  bar: {
    paddingTop: '10px',
    paddingBottom: '10px',
    background: theme.palette.white,
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: theme.palette.spaceBlue,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    paddingBottom: '10px',
    position: 'fixed',
    width: '100%',
    zIndex: '-1',
    top: 0,
    left: 0,
  },
  menuContainer: {
    width: 'fit-content',
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbarPlaceholder: {
    ...theme.mixins.toolbar,
    marginBottom: '15px',
  },
  menuLink: {
    color: '#fff',
    marginTop: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  divider: {
    background: '#fff',
    opacity: 0.2,
  },
  wrapper: {
    backgroundImage: `linear-gradient(180deg, #002B5C 0%, rgba(0, 43, 92, 0.89) 100%), url(${backgroundImg})`,
    paddingBottom: '133px',
    overflow: 'hidden',
  },
  link: {
    color: theme.palette.spaceBlue,
    marginRight: '28px',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loginButton: {
    minWidth: '69px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '65px',
      height: '34px',
    },
  },
  main: {
    overflow: 'hidden',
    paddingTop: '160px',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
  },
  projectDuration: {
    marginTop: '5px',
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
  buttonGroup: {
    marginTop: '43px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  button: {
    width: '230px',
    '& span': {
      fontSize: '14px',
    },
  },
  oulined: {
    marginLeft: '15px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: '20px',
    },
  },
}));

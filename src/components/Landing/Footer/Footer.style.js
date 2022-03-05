import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    logo: {
      width: '139px',
      height: '68px',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '10px',
      },
    },
    main: {
      paddingTop: '20px',
      paddingBottom: '15px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: theme.palette.spaceBlue,
    },
    text: {
      color: '#fff',
      '& a': {
        color: '#fff',
        textDecoration: 'none',
      },
      '& a:hover': {
        textDecoration: 'underline',
      },
    },
    contacts: {
      display: 'flex',
      paddingBottom: '15px',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    contactsItem: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '24px',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginTop: '15px',
      },
    },
    iconContainer: {
      width: '20px',
      marginRight: '8px',
    },
    contactsIcon: {
      height: '17px',
    },
    divider: {
      backgroundColor: '#fff',
      opacity: '0.2',
    },
    links: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '20px',
      },
    },
    bottom: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '15px',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: '30px',
      },
    },
    linkItem: {
      marginRight: '20px',
      color: '#fff',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '5px',
      },
    },
    rights: {
      color: '#fff',
    },
    sponsorLogo: {
      width: '211px',
      height: '29px',
      marginRight: '20px',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '10px',
      },
    },
  }));
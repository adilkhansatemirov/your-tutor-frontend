import { makeStyles } from '@material-ui/core';
import ornament1Img from 'assets/images/ornament1.png';

export default makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    overflow: 'hidden',
    paddingTop: '120px',
    paddingBottom: '45px',
    maxWidth: '1600px',
    backgroundColor: '#fff',
    backgroundImage: ` url(${ornament1Img})` ,
    [theme.breakpoints.down('xs')]: {
      paddingTop: '48px',
      paddingBottom: 0,
    },
  },
  title: {
    textAlign: 'center',
    color: '#0F2C4C',
  },
  number: {
    backgroundColor: theme.palette.spaceBlue,
    color: theme.palette.silverGray.main,
    minWidth: '76px',
    height: '76px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
      minWidth: '34px',
      height: '34px',
      fontSize: '20px',
    },
  },
  listItem: {
    marginBottom: '47px',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
    },
  },
  itemInfo: {
    marginLeft: '21px',
  },
  itemTitle: {
    marginBottom: '5px',
  },
}));

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
    paddingTop: '66.82px',
    paddingBottom: '80px',
    maxWidth: '1600px',
    backgroundColor: '#fff',
    backgroundImage: ` url(${ornament1Img})` ,
    backgroundSize:'cover',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '48px',
      paddingBottom: 0,
    },
  },
  title: {
    textAlign: 'center',
    color: '#0F2C4C',
  },
  listItem: {
    marginBottom: '0px',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
    },
  },
  iconContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIcon: {
    marginTop:'32px',
    width: '170px',
    [theme.breakpoints.down('xs')]: {
      width: '30px',
    },
  },
  itemInfo: {
    margin: '0',
  },
  itemTitle: {
    marginTop:'24px',
  },
}));

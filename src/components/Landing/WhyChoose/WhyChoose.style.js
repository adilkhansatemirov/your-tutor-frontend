import { makeStyles } from '@material-ui/core';

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
    paddingTop: '20px',
    paddingBottom: '40px',
    maxWidth: '1600px',
    paddingLeft:'0px',
    backgroundColor: '#E8EDF7',
  },
  title: {
    textAlign: 'center',
  },
  number: {
   // backgroundColor: theme.palette.white,
   // color: theme.palette.black.main,
    minWidth: '70px',
    height: '7px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '50px',
    fontWeight: 'Regular',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
      minWidth: '34px',
      height: '34px',
      fontSize: '20px',
    },
  },
  listItem: {
    marginBottom: '47px',
    paddingLeft:'225px',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
    },
  },
  itemInfo: {
    marginLeft: '25px',
  },
  itemTitle: {
    marginBottom: '3px',
  },

}));

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
    paddingTop: '120px',
    paddingBottom: '45px',
    maxWidth: '800px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '48px',
      paddingBottom: 0,
    },
  },
  title: {
    textAlign: 'center',
  },
  stick: {
    backgroundColor: theme.palette.skyBlue.main,
    width: '52px',
    height: '3px',
    marginTop: '14px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  project_duration: {
    marginTop: '17px',
    textAlign: 'center',
    marginBottom: '57px',
  },
  number: {
    backgroundColor: theme.palette.spaceBlue,
    color: theme.palette.lightYellow.main,
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

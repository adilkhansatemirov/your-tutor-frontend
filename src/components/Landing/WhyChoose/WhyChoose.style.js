import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.smokeWhite,
  },
  container: {
    overflow: 'hidden',
    paddingTop: '121px',
    paddingBottom: '133px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '50px',
      paddingBottom: '60px',
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
  iconContainer: {
    backgroundColor: theme.palette.skyBlue.main,
    color: theme.palette.lightYellow.main,
    minWidth: '76px',
    height: '76px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
    transition: '0.3s all',
    boxShadow: '0px 20px 20px rgba(120, 160, 227, 0.28)',
    [theme.breakpoints.down('xs')]: {
      minWidth: '60px',
      height: '60px',
    },
  },
  list: {
    marginTop: '57px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '24px',
    },
  },
  itemInfo: {
    marginTop: '20px',
  },
  itemTitle: {
    marginLeft: '25px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '12px',
    },
  },
  itemIcon: {
    width: '38px',
    [theme.breakpoints.down('xs')]: {
      width: '30px',
    },
  },
  itemText: {
    lineHeight: '24px',
  },
  paper: {
    padding: '25px',
    height: '100%',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: '0.3s all',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
    '&:hover $iconContainer': {
      backgroundColor: theme.palette.spaceBlue,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '15px',
    },
  },
  paperHeader: {
    display: 'flex',
    alignItems: 'center',
  },
}));

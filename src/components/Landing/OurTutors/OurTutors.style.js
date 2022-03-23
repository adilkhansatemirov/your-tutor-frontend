import { makeStyles } from '@material-ui/core';
import backgroundButtomImg from 'assets/images/ornamentButtom.png';


export default makeStyles((theme) => ({
  main: {
    backgroundImage: `url(${backgroundButtomImg})`,
    backgroundSize:'cover',
  },
  container: {
    overflow: 'hidden',
    paddingTop: '80px',
    paddingBottom: '0px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '50px',
      paddingBottom: '60px',
    },
  },
  title: {
    textAlign: 'center',
    color:'#0F2C4C',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '32px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '24px',
    },
  },
  girlImg:{
    width: '381.11px',
    height:'450px',
  },
  paper: {
    borderRadius: '0px 20px 20px 0px',
    padding: '24px 82px 55px 53px',
    marginTop:'85px',
    marginLeft: '101px',
    height: '100%',
    width:'700px',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: '0.3s all',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
    '&:hover $iconContainer': {
      backgroundColor: theme.palette.smokeWhite,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '15px',
    },
  },
  paperHeader: {
    display: 'flex',
    alignItems: 'left',
    paddingTop:'4px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starsIcon: {
    width: '119px',
    height: '24px',
    [theme.breakpoints.down('xs')]: {
      width: '30px',
    },
  },
  itemRating: {
    marginLeft: '10px',
    marginTop:'4px',
    color:'#C4C4C4',
  },
  itemInfo: {
    marginTop: '16px',
  },
  itemText: {
    lineHeight: '22px',
  },
  authorInfo:{
    marginLeft: '0px',
    marginTop:'8px',
    color:'#C4C4C4',
  },

  paperSecond: {
    borderRadius: '20px 0px 0px 20px',
    padding: '24px 54px 55px 57px',
    marginTop:'46px',
    marginRight: '116px',
    height: '100%',
    width:'700px',
    boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: '0.3s all',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
    '&:hover $iconContainer': {
      backgroundColor: theme.palette.smokeWhite,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '15px',
    },
  },
  boylImg:{
    width: '364px',
    height:'400px',
  },
}));
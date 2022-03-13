import { makeStyles } from '@material-ui/core';
import backgroundImg from 'assets/images/background.jpg';

export default makeStyles((theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    overflow: 'hidden',
    paddingTop: '25px',
    paddingBottom: '70px',
    maxWidth: '600px',
    paddingLeft:'0px',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'left',
    color:'#0F2C4C',
  },
  title2: {
    textAlign: 'center',
    color:'#0F2C4C',
  },
  
  description: {
    marginBottom: '10px',
  },

}));
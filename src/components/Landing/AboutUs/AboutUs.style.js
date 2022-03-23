import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  main: {
    margin:'80px 0 40px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  macBook:{
    width: '600px',
    height:'322px',
  },
  container: {
    margin:'0 67px',
    overflow: 'hidden',
    paddingTop: '0px',
    paddingBottom: '70px',
    maxWidth: '547px',
    maxHeight:'285',
    paddingLeft:'0',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom:'30px',
    textAlign: 'left',
    color:'#0F2C4C',
  },
  description: {
    marginBottom: '10px',
  },

}));
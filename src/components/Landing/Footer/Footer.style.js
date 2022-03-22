import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.white,
  },
  container:{
    //paddingTop: '0',
    //paddingBottom: '0',
   // display: 'flex',
    //flexWrap: 'wrap',
    //justifyContent: 'center',
  },
  contacts: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop:'20px',
    marginButtom:'11px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  logo: {
    width: '316px',
    height: '300px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
    },
  },
  contactsMain:{
    marginTop:'85px',
  },
  contactsText:{
    color:'#0F2C4C',
  },
  text: {
    textUnderlineOffset:'4px',
    color: '#000000',
    '& a': {
      color: '#000000',
      textDecoration: 'none',
    },
    '& a:hover': {
      textDecoration: 'underline',
    },
  },
  contactsInfo:{
    display: 'flex',
    justifyContent: 'center',
    marginTop:'32px',
  },
  contactsItem: {
    display: 'grid',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: '15px',
    },
  },
  iconContainer: {
    display: 'flex',
    marginRight: '4px',
    marginTop:'8px',
  },
  contactsIcon: {
    height: '24px',
    width:'24.1px',
  },


  socialMediaContact: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '12px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: '15px',
    },
  },
  socialsIconContainer: {
    marginRight: '30px',
  },
  socialMediaIcon: {
    width: '32px',
    height: '32px',
  },
  
  bottom: {
    paddingTop: '30px',
    paddingBottom: '37px',
    margin:'0',
    backgroundColor:'#2F3D40',
  }, 

  rights: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  }));
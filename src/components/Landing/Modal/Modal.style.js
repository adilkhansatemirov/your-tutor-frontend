import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'relative',
    borderRadius: 10,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 30,
    },
  },
  modalHeaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    background: '#ECECEC',
    padding: '5px 0',
    borderRadius: '10px 10px 0px 0px',
    textAlign: 'center',
  },
  formWrapper: {
    padding: '30px 0',
    flexDirection: 'column',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiInputBase-root': {
      [theme.breakpoints.down('xs')]: {
        minWidth: 'auto',
      },
    },
  },
  title: {
    padding: '0 15px',
    marginTop: 15,
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  dialog: {
    '& .MuiDialog-paper': {
      overflow: 'visible',
      borderRadius: 10,
      width: '100%',
      maxWidth: 560,
    },
    '& .MuiDialog-container	': {
      overflow: 'auto',
    },
  },
  form: {
    '& .MuiButton-contained': {
      marginTop: 15,
    },
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0 35px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 15px',
    },
  },
  footerWrapper: {
    textAlign: 'center',
    marginTop: 12,
  },
  inputWrapper: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  formText: {
    textAlign: 'center',
    margin: '0 0 20px 0',
    fontSize: 20,
  },
  submitButton: {
    marginTop: '15px',
  },
}));

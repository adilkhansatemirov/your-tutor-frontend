import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: '0 15px',
    },
  },
  footerWrapper: {
    textAlign: 'center',
    marginTop: 12,
  },
  formText: {
    textAlign: 'center',
    margin: '0 0 20px 0',
    fontSize: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    minWidth: 'auto',
    width: 100,
    marginTop: 30,
  },
}));

export default useStyles;

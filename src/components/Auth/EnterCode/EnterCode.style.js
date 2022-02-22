import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 15,
    fontSize: 33,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '30px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 15px',
    },
  },
  formText: {
    textAlign: 'center',
    margin: '0 0 20px 0',
    fontSize: 20,
  },
  input: {
    maxWidth: 350,
    marginBottom: 7,
  },
  button: {
    minWidth: 'auto',
    width: 100,
    marginTop: 30,
  },
}));

export default useStyles;

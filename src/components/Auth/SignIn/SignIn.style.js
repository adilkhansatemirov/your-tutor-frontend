import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '40px',
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
  input: {
    maxWidth: 350,
    marginBottom: 7,
  },
  email: {
    color: '#004BA1',
    marginTop: '16px',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
  },
  acitonsWrapper: {
    display: 'flex',
  },
  actionsItem: {
    userSelect: 'none',
    cursor: 'pointer',
    display: 'flex',
    marginRight: 30,
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 3,
  },
  button: {
    minWidth: 'auto',
    width: 100,
    marginTop: 30,
  },
}));

export default useStyles;

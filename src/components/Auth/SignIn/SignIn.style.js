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
    fontSize: 14,
  },
  input: {
    maxWidth: 300,
    marginBottom: 7,
    backgroundColor:'#E8EDF7',
  },
  email: {
    color: '#E8EDF7',
    marginTop: '16px',
  },
  title: {
    color:'#E8EDF7',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    color:'#E8EDF7',
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
    color:'#E8EDF7',
  },
  actionIcon: {
    marginRight: 3,
  },
  button: {
    minWidth: 'auto',
    width: 100,
    marginTop: 30,
    backgroundColor:'#FFC739',
    color:'#2F3D40',
    borderRadius:'20px',
  },
}));

export default useStyles;

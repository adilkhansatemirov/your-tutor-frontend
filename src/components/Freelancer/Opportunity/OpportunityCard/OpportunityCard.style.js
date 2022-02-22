import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    borderRadius: 5,
    background: theme.palette.navyBlue.main,
    padding: '30px 20px 50px',
    width: 'calc(100% / 3 - 15px)',
    textDecoration: 'none',
    display: 'flex',
    marginRight: '20px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover $arrowRight': {
      marginLeft: 7,
    },
    '&:last-child': {
      marginRight: '0',
    },
  },
  arrowRight: {
    marginLeft: 3,
    top: 1,
    position: 'relative',
    transition: 'margin .2s',
  },
  divider: {
    background: theme.palette.lightYellow.main,
    height: 5,
    borderRadius: 3,
    width: 50,
    marginBottom: 15,
  },
  statusBox: {
    padding: '1px 10px',
    borderRadius: 3,
    fontWeight: 'bold',
    maxWidth: 80,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
}));

export default useStyles;

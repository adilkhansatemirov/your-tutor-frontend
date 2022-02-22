import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.colbatBlue.main,
    marginRight: '20px',
    padding: '30px 20px 50px',
    width: 'calc(100% / 3 - 15px)',
    textDecoration: 'none',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    '&:hover $arrowRight': {
      marginLeft: 7,
    },
    '&:hover $companyName': {
      opacity: 1,
    },

    '&:last-child': {
      marginRight: '0',
    },
  },
  companyName: {
    color: theme.palette.white,
    opacity: 0.5,
    transition: 'opacity .2s',
  },
  title: {
    fontSize: 24,
    lineHeight: 1.3,
  },
  arrowRight: {
    marginLeft: 3,
    top: 1,
    position: 'relative',
    transition: 'margin .2s',
  },
}));

export default useStyles;

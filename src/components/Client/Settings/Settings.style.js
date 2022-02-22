import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginBottom: '4px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 25,
    width: '50%',
    height: 170,
    borderRadius: 5,
    cursor: 'pointer',
    '&:hover $text': {
      marginRight: 15,
    },
    '&:first-child': {
      marginRight: 25,
      backgroundColor: theme.palette.skyBlue.main,
    },
    '&:first-child $text': {
      color: theme.palette.white,
    },
    '&:nth-child(2)': {
      background: theme.palette.coldWhite,
      border: `1px solid ${theme.palette.bluishBlack}`,
      boxSizing: 'border-box',
    },
  },
  text: {
    fontSize: 24,
    marginRight: 10,
    transition: 'all .3s',
  },
  textWrapper: {
    cursor: 'pointer',
    '&:hover $text': {
      marginRight: 15,
    },
  },
}));

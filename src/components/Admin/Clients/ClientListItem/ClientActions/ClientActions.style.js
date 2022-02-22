import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  actionButton: {
    border: `1px solid ${theme.palette.silverGray.main}`,
    width: '240px',
    height: '38px',
    borderRadius: '3px',
    backgroundColor: theme.palette.white,
    '&:hover': {
      backgroundColor: theme.palette.white,
    },
  },
  selectIcon: {
    position: 'absolute',
    right: 8,
    top: 13,
  },
  actionButtonLabel: {
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '10px',
    paddingRight: '10px',
    color: '#999',
    fontSize: '16px',
  },
  actionMenu: {
    width: '240px',
  },
}));

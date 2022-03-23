import { TableCell, withStyles } from '@material-ui/core';
export default withStyles((theme) => ({
  root: {
    border: 'none',
    '&:first-child': {
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
    },
    '&:last-child': {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
    },
  },
  head: {
    backgroundColor: `#2F3D40`,
    color: 'white',
    fontWeight: 'normal',
    fontSize: 16,
    fontfamily: 'roboto',

  },
  body: {
    color: theme.palette.black,
    fontSize: 16,
  },
}))(TableCell);

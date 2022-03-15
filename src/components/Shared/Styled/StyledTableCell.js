import { TableCell, withStyles } from '@material-ui/core';
export default withStyles((theme) => ({
  root: {
    border: 'none',
    '&:first-child': {
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
    },
    '&:last-child': {
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '5px',
    },
  },
  head: {
    backgroundColor: `#2F3D40`,
    color: 'white',
    fontWeight: 'bold',
  },
  body: {
    color: theme.palette.black,
    fontSize: 14,
  },
}))(TableCell);

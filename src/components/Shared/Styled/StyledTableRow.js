import { TableRow, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: ({ red }) => (red ? theme.palette.tomatoRed.main : theme.palette.white),
    cursor: ({ clickable }) => (clickable ? 'pointer' : 'default'),
    height: '50px',
    borderRadius: '5px',
    marginBottom: '10px',
    '&:nth-child(even)': {
      backgroundColor: ({ red }) => (red ? theme.palette.tomatoRed.pale : theme.palette.coldWhite),
    },
  },
}));

function StyledTableRow({ red, onClick, children, ...rest }) {
  const classes = useStyles({ red, clickable: Boolean(onClick) });

  return (
    <TableRow onClick={onClick} classes={classes} {...rest}>
      {children}
    </TableRow>
  );
}

export default StyledTableRow;

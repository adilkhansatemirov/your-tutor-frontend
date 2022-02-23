import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function ClientLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Student Layout
    </div>
  );
}

export default ClientLayout;

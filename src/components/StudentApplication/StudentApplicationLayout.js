import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F7FB',
    width: '100%',
    height: '100vh',
  },
}));

function StudentApplicationLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Student application route
    </div>
  );
}

export default StudentApplicationLayout;

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    flex: 1,
    paddingLeft: '30px',
    paddingRight: '60px',
    position: 'relative',
  },
}));

function AdminLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Admin Layout
    </div>
  );
}

export default AdminLayout;

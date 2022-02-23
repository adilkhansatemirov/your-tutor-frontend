import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function TutorLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Tutor Layout
    </div>
  );
}

export default TutorLayout;

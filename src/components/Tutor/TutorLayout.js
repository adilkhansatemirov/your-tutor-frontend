import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F7FB',
    width: '100%',
    height: '100vh',
  },
}));

function TutorLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Tutor Layout
      <br />
      <Link to={`/`}>Back to Landing</Link>
    </div>
  );
}

export default TutorLayout;

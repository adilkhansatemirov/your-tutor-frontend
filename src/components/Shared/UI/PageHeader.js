import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '30px',
    marginBottom: '122px',
  },
}));

function PageHeader({ children }) {
  const classes = useStyles();
  return <Box className={classes.root}>{children}</Box>;
}

export default PageHeader;

import { makeStyles, Tabs } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 0,
  },
  indicator: {
    backgroundColor: theme.palette.black,
  },
}));

function StyledTabs({ children, ...rest }) {
  const classes = useStyles();

  return (
    <Tabs classes={classes} aria-label="tabs" {...rest}>
      {children}
    </Tabs>
  );
}

export default StyledTabs;

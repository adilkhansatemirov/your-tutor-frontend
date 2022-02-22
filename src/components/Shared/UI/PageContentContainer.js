import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.common.white,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
    borderRadius: 5,
    padding: ({ smallPadding }) => (smallPadding ? '15px' : '25px'),
    flex: 1,
    overflow: 'auto',
  },
}));

// THIS COMPONENT IS THE WHITE BOX THAT HOLDS THE CONTENT OF THE PAGE
function PageContentContainer({ children, smallPadding }) {
  const classes = useStyles({ smallPadding });
  return <Box className={classes.container}>{children}</Box>;
}

export default PageContentContainer;

import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.white,
    border: ({ red }) => `1px solid ${red ? theme.palette.tomatoRed.main : theme.palette.silverGray.pale}`,
    borderRadius: '5px',
    padding: '20px',
    marginBottom: '25px',
  },
}));

export default function InfoBox({ red, ...rest }) {
  const classes = useStyles({ red });
  return <Box className={classes.root} {...rest} />;
}

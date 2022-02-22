import { FormControlLabel, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.silverGray.main}`,
    marginLeft: '0px',
    paddingRight: '10px',
    borderRadius: '3px',
    marginBottom: '10px',
  },
  label: {
    fontSize: '15px',
  },
}));

function StyledRadioFormControlLabel(props) {
  const classes = useStyles();

  return <FormControlLabel classes={classes} {...props} />;
}

export default StyledRadioFormControlLabel;

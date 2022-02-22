import { Checkbox, withStyles } from '@material-ui/core';
export default withStyles((theme) => ({
  root: {
    color: theme.palette.bluishBlack,
    '&$checked': {
      color: theme.palette.bluishBlack,
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

import { Checkbox, withStyles } from '@material-ui/core';
export default withStyles((theme) => ({
  root: {
    color: theme.palette.black,
    '&$checked': {
      color: theme.palette.black,
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

import { Checkbox, withStyles } from '@material-ui/core';
export default withStyles((theme) => ({
  root: {
    color: 'pink',
    '&$checked': {
      color: 'pink',
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

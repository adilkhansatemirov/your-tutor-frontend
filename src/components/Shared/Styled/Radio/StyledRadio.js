import { makeStyles, Radio } from '@material-ui/core';
import clsx from 'clsx';
import checkedIcon from 'assets/icons/check-white.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 28,
    height: 28,
    border: `2px solid ${theme.palette.silverGray.dark}`,
    backgroundColor: theme.palette.white,
    'input:hover ~ &': {
      backgroundColor: theme.palette.smokeWhite,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: theme.palette.silverGray.dark,
    },
  },
  checkedIcon: {
    padding: '6px',
    border: 'none',
    backgroundColor: theme.palette.bluishBlack,
    'input:hover ~ &': {
      backgroundColor: theme.palette.bluishBlack,
    },
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      checkedIcon={<img src={checkedIcon} alt="check" className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      color="default"
      disableRipple
      {...props}
    />
  );
}

export default StyledRadio;

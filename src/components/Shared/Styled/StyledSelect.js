import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  select: {
    '& .MuiOutlinedInput-input': {
      padding: ({ small }) => (small ? '10px' : '18.5px 32px 18.5px 14px'),
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.silverGray.main}`,
      borderRadius: 3,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.silverGray.main}`,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      boxShadow: `0px 3px 3px ${theme.palette.skyBlue.main}`,
      border: `2px solid ${theme.palette.skyBlue.main}`,
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      boxShadow: `0px 4px 4px ${theme.palette.tomatoRed.pale}`,
      border: `2px solid ${theme.palette.tomatoRed.main}`,
    },
  },
}));

const StyledSelect = React.forwardRef(({ className, small, ...rest }, ref) => {
  const classes = useStyles({ small });

  return <Select ref={ref} className={clsx(classes.select, className)} {...rest} />;
});

export default StyledSelect;

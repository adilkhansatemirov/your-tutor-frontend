import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-multiline': {
      padding: 0,
    },
    '& .MuiOutlinedInput-root': {
      fontFamily: ({ fontFamily }) => (fontFamily ? fontFamily : 'Roboto'),
      '& fieldset': {
        border: `1px solid ${theme.palette.dark.main}`,
        borderRadius: '3px',
      },
      '&:hover fieldset': {
        border: `1px solid ${theme.palette.dark.main}`,
      },
      '&.Mui-focused fieldset': {
        boxShadow: `0px 4px 4px ${theme.palette.skyBlue.pale}`,
        border: `2px solid ${theme.palette.skyBlue.main}`,
      },
      '&.Mui-error fieldset': {
        boxShadow: `0px 4px 4px ${theme.palette.tomatoRed.pale}`,
        border: `2px solid ${theme.palette.tomatoRed.main}`,
      },
    },
  },
}));

const StyledTextField = React.forwardRef(({ fontFamily, small, ...rest }, ref) => {
  const classes = useStyles({ fontFamily });

  return (
    <TextField
      ref={ref}
      classes={classes}
      inputProps={{
        style: {
          padding: small ? '10px' : '18.5px 14px',
        },
      }}
      //variant="outlined"
      {...rest}
    />
  );
});

export default StyledTextField;

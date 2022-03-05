import { Box, makeStyles } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import React from 'react';

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '5px 10px',
    border: `1px solid ${theme.palette.silverGray.pale}`,
    borderRadius: '5px',
    marginRight: '16px',
  },
}));

export default function StatusCounter({ label, count, color }) {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <StyledTypography fontSize={10}>{label}</StyledTypography>
      <StyledTypography fontSize={18} fontWeight="bold" color={color}>
        {count}
      </StyledTypography>
    </Box>
  );
}

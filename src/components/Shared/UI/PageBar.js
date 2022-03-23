import { Box } from '@material-ui/core';
import React from 'react';
import StyledTypography from '../Styled/StyledTypography';

function PageBar({ barColor, textColor, text }) {
  return (
    <Box style={{ backgroundColor: barColor, position: 'absolute', left: 0, top: 0, width: '100%', padding: '5px 0' }}>
      <StyledTypography color={textColor} fontWeight="bold" align="center">
        {text}
      </StyledTypography>
    </Box>
  );
}

export default PageBar;

import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import useStyles from './Status.style';

function Status({ color, text, complete }) {
  const classes = useStyles({ color, complete });
  return (
    <Box display="flex" alignItems="center">
      <Box className={classes.pill} />
      <StyledTypography className={classes.text} fontWeight="bold" fontSize={12}>
        {text}
      </StyledTypography>
    </Box>
  );
}

export default Status;

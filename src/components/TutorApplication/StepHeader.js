import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

function StepHeader({ title, step }) {
  return (
    <Box>
      <StyledTypography style={{ marginBottom: '8px' }} fontFamily="Rubik" fontWeight="bold" fontSize={12}>
        Step {step}
      </StyledTypography>
      <StyledTypography style={{ marginBottom: '20px' }} type="h1" fontFamily="Rubik" fontWeight="bold" fontSize={30}>
        {title}
      </StyledTypography>
    </Box>
  );
}

export default StepHeader;

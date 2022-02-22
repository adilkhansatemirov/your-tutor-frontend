import StyledTypography from 'components/Shared/Styled/StyledTypography';

function StepNumber({ stepNumber }) {
  return (
    <StyledTypography fontWeight="bold" fontFamily="Rubik" style={{ marginBottom: '8px' }} fontSize="12px">
      Step {stepNumber}
    </StyledTypography>
  );
}

export default StepNumber;

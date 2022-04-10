import StyledTypography from 'components/Shared/Styled/StyledTypography';

function StepNumber({ stepNumber }) {
  return (
    <StyledTypography fontWeight="regular" fontFamily="Roboto" style={{ marginBottom: '8px' }} fontSize="18px">
      Step {stepNumber}
    </StyledTypography>
  );
}

export default StepNumber;

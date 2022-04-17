import StyledTypography from 'components/Shared/Styled/StyledTypography';

function StepTitle({ text }) {
  return (
    <StyledTypography
      fontWeight="medium"
      fontFamily="Roboto"
      fontSize="36px"
      style={{ width: '100%', marginBottom: '13px' }}
    >
      {text}
    </StyledTypography>
  );
}

export default StepTitle;

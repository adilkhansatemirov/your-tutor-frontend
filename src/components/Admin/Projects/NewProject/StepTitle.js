import StyledTypography from 'components/Shared/Styled/StyledTypography';

function StepTitle({ text }) {
  return (
    <StyledTypography
      fontWeight="bold"
      fontFamily="Rubik"
      fontSize="30px"
      style={{ width: '60%', marginBottom: '13px' }}
    >
      {text}
    </StyledTypography>
  );
}

export default StepTitle;

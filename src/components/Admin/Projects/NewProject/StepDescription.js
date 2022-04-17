import StyledTypography from 'components/Shared/Styled/StyledTypography';

function StepDescription({ text }) {
  return (
    <StyledTypography fontFamily="Roboto" fontSize="18px" style={{ marginBottom: '23px' }}>
      {text}
    </StyledTypography>
  );
}

export default StepDescription;

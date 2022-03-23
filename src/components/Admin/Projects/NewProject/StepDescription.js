import StyledTypography from 'components/Shared/Styled/StyledTypography';

function StepDescription({ text }) {
  return (
    <StyledTypography fontFamily="Rubik" fontSize="16px" style={{ marginBottom: '23px' }}>
      {text}
    </StyledTypography>
  );
}

export default StepDescription;

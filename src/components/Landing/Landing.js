import StyledButton from 'components/Shared/Styled/StyledButton'
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

function PageLanding() {
  return (
    <div>
        Landing
        <StyledButton variant="light">
          test
        </StyledButton>
        <StyledButton variant="dark">
          test
        </StyledButton>
        <StyledButton size="small">
          test
        </StyledButton>
        <StyledButton size="normal">
          test
        </StyledButton>
        <StyledButton size="large">
          test
        </StyledButton>
        <StyledTypography fontSize="20px">
          Test
        </StyledTypography>
        <StyledTypography fontSize="30px" color="skyBlue" fontWeight="medium">
          Test
        </StyledTypography>
        <StyledTextField small />
        <StyledTextField />
     </div>
  );
}

export default PageLanding;

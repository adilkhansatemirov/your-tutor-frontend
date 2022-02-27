import { Box } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { Link } from 'react-router-dom';

function PageLanding() {
  return (
    <div>
      <StyledTypography fontSize={'50px'} fontWeight={'bold'}>
        Landing
      </StyledTypography>
      <Box marginBottom={'40px'}>
        <StyledButton variant="light">test</StyledButton>
        <StyledButton variant="dark">test</StyledButton>
        <StyledButton size="small">test</StyledButton>
        <StyledButton size="normal">test</StyledButton>
        <StyledButton size="large">test</StyledButton>
      </Box>
      <Box marginBottom={'40px'}>
        <StyledTypography fontSize="20px">Test</StyledTypography>
        <StyledTypography fontSize="30px" color="skyBlue" fontWeight="medium">
          Test
        </StyledTypography>
      </Box>
      <Box marginBottom={'40px'}>
        <StyledTextField small />
        <StyledTextField />
      </Box>

      {/* Routing */}
      <br />
      <br />
      <br />

      <Link to={`/admin`}>Link Admin page</Link>
      <br />
      <Link to={`/tutor`}>Link Tutor page</Link>
      <br />
      <Link to={`/tutor-application`}>Link Tutor application page</Link>
      <br />
      <Link to={`/student`}>Link Student page</Link>
      <br />
      <Link to={`/student-application`}>Link Student application page</Link>
    </div>
  );
}

export default PageLanding;

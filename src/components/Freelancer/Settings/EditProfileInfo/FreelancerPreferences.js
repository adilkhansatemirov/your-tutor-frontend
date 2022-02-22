import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTextField from 'components/Shared/Styled/StyledTextField';

function FreelancerPreferences({ freelancerDetails, setFreelancerDetails }) {
  return (
    <Box display="flex" style={{ marginTop: '23px' }}>
      <Box style={{ marginRight: '50px' }}>
        <StyledTypography style={{ marginBottom: '12px' }} fontWeight="bold">
          Work hours per week
        </StyledTypography>
        <Box display="flex" alignItems="center">
          <StyledTextField
            onChange={(e) =>
              setFreelancerDetails({
                ...freelancerDetails,
                work_hours_per_week: e.target.value,
              })
            }
            small
            type="number"
            value={freelancerDetails.work_hours_per_week || ''}
            style={{ maxWidth: 96 }}
            placeholder="40"
          />
          <StyledTypography style={{ marginLeft: '7px' }}>hours</StyledTypography>
        </Box>
      </Box>
      <Box>
        <StyledTypography style={{ marginBottom: '12px' }} fontWeight="bold">
          Desired hourly rate
        </StyledTypography>
        <Box display="flex" alignItems="center">
          <StyledTextField
            onChange={(e) =>
              setFreelancerDetails({
                ...freelancerDetails,
                desired_hourly_rate: e.target.value,
              })
            }
            small
            type="number"
            value={freelancerDetails.desired_hourly_rate || ''}
            style={{ maxWidth: 96 }}
            placeholder="50"
          />
          <StyledTypography style={{ marginLeft: '7px' }}>/hour</StyledTypography>
        </Box>
      </Box>
    </Box>
  );
}

export default FreelancerPreferences;

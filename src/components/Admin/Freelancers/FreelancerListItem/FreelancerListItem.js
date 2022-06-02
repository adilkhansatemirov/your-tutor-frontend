import { Link } from 'react-router-dom';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import Status from 'components/Shared/UI/Status/Status';
import { Box } from '@material-ui/core';
import moment from 'moment';

function FreelancerListItem({ freelancer }) {
  const getColor = () => {
    switch (freelancer.profile_status) {
      case 'approved':
        return 'green';
      case 'pending_approval':
        return 'orange';
      case 'billing':
        return 'green';
      case 'blocked':
        return 'red';
      default:
        return 'red';
    }
  };

  const getText = () => {
    switch (freelancer.profile_status) {
      case 'approved':
        return 'Approved';
      case 'pending_approval':
        return 'Pending Approval';
      case 'billing':
        return 'Billing';
      case 'blocked':
        return 'Blocked';
      default:
        return '';
    }
  };

  const getComplete = () => {
    switch (freelancer.profile_status) {
      case 'approved':
        return false;
      case 'pending_approval':
        return true;
      case 'billing':
        return true;
      case 'blocked':
        return true;
      default:
        return false;
    }
  };

  const freelancerStatus = {
    color: getColor(),
    text: getText(),
    complete: getComplete(),
  };

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Box style={{ width: 'fit-content' }}>
          <Link to={`/admin/tutors/${freelancer.user.id}`} style={{ textDecoration: 'none' }}>
            <StyledTypography color="skyBlue" fontSize={12} fontWeight="bold">
              {`${freelancer.user.first_name} ${freelancer.user.last_name}`}
            </StyledTypography>
          </Link>
        </Box>
        <StyledTypography fontSize={12}>{freelancer.user.email}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <Status complete={freelancerStatus.complete} color={freelancerStatus.color} text={freelancerStatus.text} />
      </StyledTableCell>
      <StyledTableCell>
        {freelancer.specialization.length > 0 ? (
          <StyledTypography style={{ maxWidth: '160px' }} fontSize={12}>
            {freelancer.specialization.join(', ')}
          </StyledTypography>
        ) : (
          <StyledTypography style={{ maxWidth: '160px' }} fontSize={12}>
            Not selected
          </StyledTypography>
        )}
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>{moment(freelancer.user.created_at).format('MM/DD/YYYY')}</StyledTypography>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default FreelancerListItem;

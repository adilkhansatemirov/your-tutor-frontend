import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import Status from 'components/Shared/UI/Status/Status';
import { Link } from 'react-router-dom';
import { capitalize, removeUnderscores } from 'utils/common';

function FreelancerListItem({ project }) {
  const getColor = () => {
    switch (project.project_status) {
      case 'accepting_bids': return 'orange';
      case 'assigning_freelancer': return 'orange';
      case 'active': return 'green';
      case 'inactive': return 'red';
      default: return 'red';
    }
  };

  const getComplete = () => {
    switch (project.project_status) {
      case 'accepting_bids': return false;
      case 'active': return true;
      case 'inactive': return true;
      default: return false;
    }
  };

  const projectStatus = {
    color: getColor(),
    text: capitalize(removeUnderscores(project.project_status)),
    complete: getComplete(),
  };

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Link to={`/admin/projects/${project.id}`} style={{ textDecoration: 'none' }}>
          <StyledTypography color="skyBlue" fontSize={12} fontWeight="bold">
            {project.title}
          </StyledTypography>
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12} fontWeight="bold">
          {`${project.client_detail.user.first_name} ${project.client_detail.user.last_name}`}
        </StyledTypography>
        <StyledTypography fontSize={12}>{project.client_detail.user.email}</StyledTypography>
        <StyledTypography fontSize={12}>{project.client_detail.company_name}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        {project.freelancer_detail ? (
          <>
            <StyledTypography fontSize={12} fontWeight="bold">
              {`${project.freelancer_detail.user.first_name} ${project.freelancer_detail.user.last_name}`}
            </StyledTypography>
            <StyledTypography fontSize={12}>{project.freelancer_detail.user.email}</StyledTypography>
          </>
        ) : project.project_status === 'accepting_bids' || project.project_status === 'assigning_freelancer' ? (
          <StyledTypography fontSize={12} fontWeight="bold">
            Not Selected
          </StyledTypography>
        ) : (
          <StyledTypography fontSize={12} fontWeight="bold">
            Deleted user
          </StyledTypography>
        )}
      </StyledTableCell>
      <StyledTableCell>
        <Status color={projectStatus.color} text={projectStatus.text} complete={projectStatus.complete} />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default FreelancerListItem;

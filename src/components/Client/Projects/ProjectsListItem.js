import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import Status from 'components/Shared/UI/Status/Status';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { capitalize, removeUnderscores } from 'utils/common';

function ProjectsListItem({ project }) {
  const getColor = (status) => {
    switch (status) {
      case 'accepting_bids':
        return 'orange';
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      default:
        return 'red';
    }
  };

  const getComplete = (status) => {
    switch (status) {
      case 'accepting_bids':
        return false;
      case 'active':
        return true;
      case 'inactive':
        return true;
      default:
        return false;
    }
  };

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Link to={`/client/projects/${project.id}`} style={{ textDecoration: 'none' }}>
          <StyledTypography color="skyBlue" fontSize={12} fontWeight="bold">
            {project.title}
          </StyledTypography>
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        <NumberFormat
          prefix="$"
          value={Number(project.client_payment_amount)}
          decimalScale={2}
          fixedDecimalScale={true}
          displayType="text"
          thousandSeparator={true}
        />
      </StyledTableCell>
      <StyledTableCell>
        <Status
          color={getColor(project.project_status)}
          text={capitalize(removeUnderscores(project.project_status))}
          complete={getComplete(project.project_status)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default ProjectsListItem;

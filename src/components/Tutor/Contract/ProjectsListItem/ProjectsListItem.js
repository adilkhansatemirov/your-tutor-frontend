import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import { Link } from 'react-router-dom';
import { capitalize, removeUnderscores } from 'utils/common';
import NumberFormat from 'react-number-format';

function ProjectsListItem({ project }) {
  return (
    <StyledTableRow>
      <StyledTableCell>
        <Link to={`/tutor/contracts/${project.id}`} style={{ textDecoration: 'none' }}>
          <StyledTypography color="skyBlue" fontSize={12} fontWeight="bold">
            {project.title}
          </StyledTypography>
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>{project.student_detail.company_name}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>
          {capitalize(removeUnderscores(project.student_type_of_billing))}
        </StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <NumberFormat
          displayType="text"
          value={project.tutor_payment_amount}
          prefix={'$'}
          suffix={project.student_type_of_billing === 'hourly_rate' && '/hr'}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default ProjectsListItem;

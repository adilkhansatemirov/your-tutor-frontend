import { Table, TableBody, TableHead } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { assignFreelancerToProject } from 'services/admin/projects';
import theme from 'theme';

function ProjectBidsTable({ project, fetchProject }) {
  const { showSnackbar } = useContext(SnackbarContext);
  const [submitting, setSubmitting] = useState(false);

  const assignFreelancer = (bid) => {
    setSubmitting(true);
    const projectData = {
      freelancer_detail_id: bid.user.freelancer_detail.id,
      freelancer_payment_amount: bid.compensation,
      project_status: 'active',
    };
    assignFreelancerToProject(project.id, projectData)
      .then(() => {
        showSnackbar('Freelancer has been assigned', 'success');
        setSubmitting(false);
        fetchProject();
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'success');
      });
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '30%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>Freelancer</StyledTableCell>
          <StyledTableCell>Skills</StyledTableCell>
          <StyledTableCell>Bid</StyledTableCell>
          <StyledTableCell></StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {project.project_bids.map((bid) => (
          <StyledTableRow key={bid.id}>
            <StyledTableCell>
              <StyledTypography fontWeight="bold" color="skyBlue">
                {bid.user.first_name} {bid.user.last_name}
              </StyledTypography>
              <StyledTypography fontSize="12px">{bid.user.email}</StyledTypography>
            </StyledTableCell>
            <StyledTableCell>
              <StyledTypography fontSize="12px">Knows {bid.user.skill_groups.join(', ')}</StyledTypography>
            </StyledTableCell>
            <StyledTableCell>
              <NumberFormat
                prefix="$"
                value={Number(bid.compensation)}
                displayType="text"
                decimalScale={2}
                fixedDecimalScale={true}
                thousandSeparator={true}
              />
            </StyledTableCell>
            <StyledTableCell>
              <StyledButton
                disabled={submitting}
                fullWidth
                variant="text"
                color={theme.palette.skyBlue.main}
                size="small"
                onClick={() => assignFreelancer(bid)}
              >
                Accept Bid
              </StyledButton>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProjectBidsTable;

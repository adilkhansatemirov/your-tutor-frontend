import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import Status from 'components/Shared/UI/Status/Status';
import { capitalize, removeUnderscores } from 'utils/common';
import NumberFormat from 'react-number-format';
import ApplyOpportunityModal from '../ApplyOpportunityModal/ApplyOpportunityModal';
import { useState } from 'react';

function OpportunityListItem({ opportunity, fetchOpportunities }) {
  const getColor = () => {
    switch (opportunity.bids_status) {
      case 'new_project':
        return 'green';
      case 'seen':
        return 'green';
      case 'applied':
        return 'orange';
      case 'awarded':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'red';
    }
  };

  const getComplete = () => {
    switch (opportunity.bids_status) {
      case 'new_project':
        return false;
      case 'seen':
        return false;
      case 'applied':
        return false;
      case 'awarded':
        return true;
      case 'rejected':
        return true;
      default:
        return false;
    }
  };

  const getText = () => {
    switch (opportunity.bids_status) {
      case 'new_project':
        return 'New';
      case 'seen':
        return 'New';
      default:
        return capitalize(opportunity.bids_status);
    }
  };

  const projectStatus = {
    color: getColor(),
    text: getText(),
    complete: getComplete(),
  };

  const [isApplyModelOpen, setApplyModalOpen] = useState(false);

  const openApplyModal = () => {
    setApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setApplyModalOpen(false);
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell>
          <StyledTypography
            onClick={openApplyModal}
            style={{ cursor: 'pointer' }}
            color="skyBlue"
            fontSize={12}
            fontWeight="bold"
          >
            {opportunity.project.title}
          </StyledTypography>
        </StyledTableCell>
        <StyledTableCell>
          <StyledTypography fontSize={12}>
            {capitalize(removeUnderscores(opportunity.project.client_type_of_billing))}
          </StyledTypography>
        </StyledTableCell>
        <StyledTableCell>
          <StyledTypography fontSize={12}>
            <NumberFormat
              displayType="text"
              value={opportunity.project.freelancer_payment_amount}
              prefix={'$'}
              suffix={opportunity.project.client_type_of_billing === 'hourly_rate' && '/hr'}
            />
          </StyledTypography>
        </StyledTableCell>
        <StyledTableCell>
          <Status color={projectStatus.color} text={projectStatus.text} complete={projectStatus.complete} />
        </StyledTableCell>
      </StyledTableRow>
      <ApplyOpportunityModal
        open={isApplyModelOpen}
        onClose={closeApplyModal}
        opportunity={opportunity}
        fetchOpportunities={fetchOpportunities}
      />
    </>
  );
}

export default OpportunityListItem;

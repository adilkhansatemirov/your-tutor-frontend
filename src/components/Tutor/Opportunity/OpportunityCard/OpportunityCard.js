import { Box, Divider } from '@material-ui/core';
import useStyles from './OpportunityCard.style';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import FastIcon from 'components/Shared/Utils/FastIcon';
import NumberFormat from 'react-number-format';
import { useState } from 'react';
import ApplyOpportunityModal from '../ApplyOpportunityModal/ApplyOpportunityModal';

function OpportunityCard({ opportunity, fetchOpportunities }) {
  const classes = useStyles();

  const renderStatus = (status) => {
    if (status === 'new_project') {
      return (
        <Box className={classes.statusBox} style={{ color: '#012C5D', background: '#FCE341' }}>
          New
        </Box>
      );
    } else if (status === 'applied') {
      return (
        <Box className={classes.statusBox} style={{ color: '#012C5D', background: '#41FCE6' }}>
          Applied
        </Box>
      );
    } else if (status === 'rejected') {
      return (
        <Box className={classes.statusBox} style={{ color: '#fff', background: '#FC4141' }}>
          Rejected
        </Box>
      );
    } else if (status === 'awarded') {
      return (
        <Box className={classes.statusBox} style={{ color: '#012C5D', background: '#00FF19' }}>
          Awarded
        </Box>
      );
    } else {
      return;
    }
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
      <Box className={classes.root} onClick={openApplyModal}>
        {renderStatus(opportunity.bids_status)}
        <StyledTypography color="white" style={{ lineHeight: 1.3 }} fontWeight="bold" fontSize={24}>
          {opportunity.project.title}
          <FastIcon iconName="arrow-right-white" className={classes.arrowRight} />
        </StyledTypography>
        <StyledTypography color="white" style={{ lineHeight: 1.3 }} fontWeight="bold" fontSize={48}>
          <NumberFormat
            prefix="₸"
            value={Number(opportunity.project.tutor_payment_amount)}
            displayType="text"
            decimalScale={2}
            suffix={opportunity.project.student_type_of_billing === 'hourly_rate' ? '/hr' : ''}
            fixedDecimalScale={true}
            thousandSeparator={true}
          />
        </StyledTypography>
        <Divider className={classes.divider} />
        <StyledTypography color="white" className={classes.time}>
          {opportunity.project.project_duration}
        </StyledTypography>
      </Box>
      <ApplyOpportunityModal
        open={isApplyModelOpen}
        onClose={closeApplyModal}
        opportunity={opportunity}
        fetchOpportunities={fetchOpportunities}
      />
    </>
  );
}

export default OpportunityCard;

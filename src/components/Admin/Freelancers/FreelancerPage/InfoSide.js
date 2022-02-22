import { Box } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import ConfirmationModal from 'components/Shared/Utils/ConfirmationModal';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteFreelancer } from 'services/admin/freelancers';
import { capitalize, removeUnderscores } from 'utils/common';

function InfoSide({ freelancer }) {
  const history = useHistory();
  const { showSnackbar } = useContext(SnackbarContext);
  const [submitting, setSubmitting] = useState(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleDeleteFreelancer = () => {
    setSubmitting(true);
    deleteFreelancer(freelancer.id)
      .then(() => {
        history.replace('/admin/freelancers');
        showSnackbar('Freelancer has been deleted', 'success');
        setSubmitting(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setSubmitting(false);
      });
  };

  const getStatusColor = () => {
    switch (freelancer.profile_status) {
      case 'blocked':
        return 'tomatoRed';
      case 'billing':
        return 'green';
      case 'approved':
        return 'green';
      case 'pending_approval':
        return 'orange';
      default:
        return 'orange';
    }
  };

  const freelancerInfo = {
    fullname: `${freelancer.first_name} ${freelancer.last_name}`,
    email: freelancer.email,
    status: capitalize(removeUnderscores(freelancer.profile_status)),
    statusColor: getStatusColor(),
  };

  const freelancerPreferences = {
    show: freelancer.freelancer_detail.work_hours_per_week && freelancer.freelancer_detail.desired_hourly_rate,
    hourlyRate: freelancer.freelancer_detail.desired_hourly_rate,
    workHours: freelancer.freelancer_detail.work_hours_per_week,
  };

  return (
    <Box style={{ width: '30%' }}>
      <InfoBox>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Freelancer
        </StyledTypography>

        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={14} fontWeight="bold">
          {freelancerInfo.fullname}
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
          {freelancerInfo.email}
        </StyledTypography>

        <StyledTypography
          style={{ marginTop: '5px', marginBottom: '5px' }}
          fontFamily="Rubik"
          fontSize={20}
          fontWeight="medium"
          color={freelancerInfo.statusColor}
        >
          {freelancerInfo.status}
        </StyledTypography>
      </InfoBox>
      {freelancerPreferences.show && (
        <InfoBox>
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
            Preferences
          </StyledTypography>
          <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={20} fontWeight="bold">
            ${freelancerPreferences.hourlyRate}/hr
          </StyledTypography>
          <StyledTypography fontFamily="Roboto" fontSize={12}>
            {freelancerPreferences.workHours} hours/week
          </StyledTypography>
        </InfoBox>
      )}

      <InfoBox red>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Dange Zone
        </StyledTypography>

        <StyledButton
          disabled={submitting}
          onClick={() => setIsConfirmationModalOpen(true)}
          variant="red"
          size="small"
          textTransform="uppercase"
        >
          Delete user
        </StyledButton>
      </InfoBox>
      <ConfirmationModal
        promtText="This action is irreversible, are you sure you want to delete freelancer?"
        loading={submitting}
        isOpen={isConfirmationModalOpen}
        handleClose={() => setIsConfirmationModalOpen(false)}
        handleConfirmAction={handleDeleteFreelancer}
        handleCancelAction={() => setIsConfirmationModalOpen(false)}
      />
    </Box>
  );
}

export default InfoSide;

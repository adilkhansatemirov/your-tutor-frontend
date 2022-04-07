import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import ValidationSchema from './ApplyOpportunityModal.validate';
import { Box, capitalize } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { updateBidsStatus } from 'services/freelancer/projectsBids';
import { SnackbarContext } from 'context/snackbarContext';
import StyledModal from 'components/Shared/UI/StyledModal';
import { removeUnderscores } from 'utils/common';
import dollarIcon from 'assets/icons/dollar-black.svg';
import NumberFormat from 'react-number-format';

function ApplyOpportunityModal({ open, onClose, opportunity, fetchOpportunities }) {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);

  const [isCustomAmountVisible, setCustomAmountVisible] = useState(false);

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(ValidationSchema),
    shouldUnregister: false,
    defaultValues: {
      price: opportunity.project.tutor_payment_amount,
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    const project_bid = {
      bids_status: 'applied',
      compensation: values.price,
    };
    updateBidsStatus(opportunity.id, { project_bid })
      .then(() => {
        fetchOpportunities();
        setLoading(false);
        onClose();
        showSnackbar('Successfully applied', 'success');
      })
      .catch(() => {
        setLoading(false);
        onClose();
        showSnackbar('Something went wrong', 'error');
      });
  };

  const getStatusColor = () => {
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
        return 'tomatoRed';
      default:
        return 'tomatoRed';
    }
  };

  const getStatusText = () => {
    switch (opportunity.bids_status) {
      case 'new_project':
        return 'New';
      case 'seen':
        return 'New';
      default:
        return capitalize(opportunity.bids_status);
    }
  };

  return (
    <StyledModal open={open} onClose={onClose} header={opportunity.project.title} loading={loading}>
      <StyledTypography style={{ marginBottom: '15px' }} fontSize={12}>
        {opportunity.project.description}
      </StyledTypography>
      <Box display="flex" justifyContent="space-between" style={{ marginBottom: '26px' }}>
        <Box>
          <StyledTypography style={{ marginBottom: '4px' }} fontSize={12}>
            Type
          </StyledTypography>
          <StyledTypography fontSize={20} fontWeight="medium">
            {capitalize(removeUnderscores(opportunity.project.student_type_of_billing))}
          </StyledTypography>
        </Box>
        <Box>
          <StyledTypography style={{ marginBottom: '4px' }} fontSize={12}>
            Amount
          </StyledTypography>
          <StyledTypography fontSize={20} fontWeight="medium">
            <NumberFormat
              prefix="$"
              value={Number(opportunity.project.tutor_payment_amount)}
              displayType="text"
              suffix={opportunity.project.student_type_of_billing === 'hourly_rate' ? '/hr' : ''}
              decimalScale={2}
              fixedDecimalScale={true}
              thousandSeparator={true}
            />
          </StyledTypography>
        </Box>
        <Box style={{ marginRight: '40px' }}>
          <StyledTypography style={{ marginBottom: '4px' }} fontSize={12}>
            Status
          </StyledTypography>
          <StyledTypography color={getStatusColor()} fontSize={20} fontWeight="medium">
            {capitalize(removeUnderscores(getStatusText()))}
          </StyledTypography>
        </Box>
      </Box>

      {(opportunity.bids_status === 'new_project' || opportunity.bids_status === 'seen') && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isCustomAmountVisible && (
              <Box display="flex" alignItems="center" style={{ marginBottom: '22px' }}>
                <img style={{ marginRight: '15px' }} src={dollarIcon} alt="dollar" />
                <Controller
                  as={<StyledTextField fontFamily="Poppins" />}
                  small
                  fullWidth
                  placeholder={opportunity.project.tutor_payment_amount}
                  name="price"
                  type="number"
                  autoComplete="none"
                  error={Boolean(errors.price)}
                  control={control}
                  helperText={errors.price && errors.price.message}
                />
                {opportunity.project.student_type_of_billing === 'hourly_rate' && (
                  <StyledTypography style={{ marginLeft: '15px', minWidth: '70px' }} fontSize="16px">
                    per hour
                  </StyledTypography>
                )}
              </Box>
            )}
            <StyledButton type="submit" size="normal" variant="light-blue" textTransform="uppercase" fullWidth>
              <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={10} color="white">
                Confirm
              </StyledTypography>
            </StyledButton>
          </form>
          {!isCustomAmountVisible && (
            <StyledTypography align="center" style={{ marginTop: '12px' }}>
              or{' '}
              <StyledTypography
                onClick={() => setCustomAmountVisible(true)}
                component="span"
                color="skyBlue"
                fontWeight="bold"
                style={{ cursor: 'pointer' }}
              >
                Offer Desired Compensation
              </StyledTypography>
            </StyledTypography>
          )}
        </>
      )}
    </StyledModal>
  );
}

export default ApplyOpportunityModal;

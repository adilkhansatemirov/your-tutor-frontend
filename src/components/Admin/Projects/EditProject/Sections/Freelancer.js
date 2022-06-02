import { useContext, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import { SnackbarContext } from 'context/snackbarContext';
import { Controller } from 'react-hook-form';
import { getAllFreelancers } from 'services/admin/freelancers';
import { Autocomplete } from '@material-ui/lab';
import { filterFreelancerOptions } from 'utils/contracts';
import tengeIcon from 'assets/icons/tenge.svg';

function Freelancer({ control, errors, setValue, trigger, project, student_type_of_billing }) {
  const { showSnackbar } = useContext(SnackbarContext);
  const [freelancers, setFreelancers] = useState([]);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  useEffect(() => {
    getAllFreelancers()
      .then((response) => {
        setFreelancers(response.data);
        if (project.freelancer_detail) {
          const freelancer = response.data.find(
            (freelancer) => freelancer.id === project.freelancer_detail.id,
          );
          setSelectedFreelancer(freelancer);
          setValue('tutor_detail_id', freelancer.id);
          trigger('tutor_detail_id');
        }
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
      });
    // eslint-disable-next-line
  }, []);

  const handleAutoCompleteValueChange = (event, value) => {
    setSelectedFreelancer(value);
    setValue('tutor_detail_id', value ? value.id : null);
    trigger('tutor_detail_id');
  };

  return (
    <InfoBox style={{ marginTop: '35px' }}>
      <Box style={{ width: '65%' }}>
        <StyledTypography fontWeight="medium" fontSize="17px">
          Freelancer
        </StyledTypography>
        <StyledTypography fontSize="16px" style={{ marginTop: '30px' }}>
          How much are we paying the freelancer?
        </StyledTypography>
        <Box display="flex" alignItems="flex-start" style={{ marginTop: '15px' }}>
          <img style={{ marginTop: '15px' }} src={tengeIcon} alt="tenge" />
          <Controller
            as={<StyledTextField placeholder="Amount" />}
            name="tutor_payment_amount"
            control={control}
            type="number"
            error={Boolean(errors.tutor_payment_amount)}
            helperText={errors.tutor_payment_amount && errors.tutor_payment_amount.message}
            style={{ width: '100px', marginBottom: '20px', marginLeft: '5px' }}
          />
          {student_type_of_billing === 'hourly_rate' && (
            <StyledTypography style={{ marginTop: '17px', marginLeft: '15px' }} fontSize="16px">
              per hour
            </StyledTypography>
          )}
        </Box>
        <StyledTypography fontSize="16px" style={{ marginTop: '30px' }}>
          Use the form below to find the freelancer for this project
        </StyledTypography>
        <Autocomplete
          options={freelancers}
          style={{ marginTop: '15px' }}
          getOptionLabel={(option) => option.user.email}
          filterOptions={filterFreelancerOptions}
          value={selectedFreelancer}
          onChange={handleAutoCompleteValueChange}
          renderOption={(option) => (
            <Box>
              <StyledTypography fontWeight="bold" fontSize="14px">
                {option.user.first_name} {option.user.last_name}
              </StyledTypography>
              <StyledTypography style={{ fontSize: '14px', opacity: 0.8 }}>{option.user.email}</StyledTypography>
            </Box>
          )}
          renderInput={(params) => (
            <Controller
              as={<StyledTextField placeholder="Enter name or email of the freelancer" {...params} />}
              name="tutor_detail_id"
              control={control}
              error={Boolean(errors.tutor_detail_id)}
              helperText={errors.tutor_detail_id && errors.tutor_detail_id.message}
            />
          )}
        />
      </Box>
    </InfoBox>
  );
}

export default Freelancer;

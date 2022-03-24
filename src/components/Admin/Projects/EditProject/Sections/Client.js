import { Box, RadioGroup } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { filterClientOptions } from 'utils/contracts';
import InfoBox from 'components/Shared/UI/InfoBox';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { getAllClients } from 'services/admin/clients';
import StyledRadioFormControlLabel from 'components/Shared/Styled/Radio/StyledRadioFormControlLabel';
import StyledRadio from 'components/Shared/Styled/Radio/StyledRadio';
import dollarIcon from 'assets/icons/dollar-black.svg';

function Client({ control, errors, setValue, trigger, project, student_type_of_billing }) {
  const { showSnackbar } = useContext(SnackbarContext);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getAllClients()
      .then((response) => {
        setClients(response.data.filter((client) => client.has_payment_info));
        const client = response.data.find((clientDetail) => clientDetail.id === project.client_detail.id);
        if (client) {
          setSelectedClient(client);
          setValue('student_detail_id', project.client_detail.id);
          trigger('student_detail_id');
        }
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
      });
    // eslint-disable-next-line
  }, []);

  const handleAutoCompleteValueChange = (event, value) => {
    setSelectedClient(value);
    setValue('student_detail_id', value ? value.id : '');
    trigger('student_detail_id');
  };

  return (
    <InfoBox style={{ marginTop: '35px' }}>
      <Box style={{ width: '65%' }}>
        <StyledTypography fontWeight="medium" fontSize="17px">
          Client
        </StyledTypography>
        <Autocomplete
          options={clients}
          style={{ marginTop: '20px' }}
          getOptionLabel={(option) => option.user.email}
          filterOptions={filterClientOptions}
          value={selectedClient}
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
              as={<StyledTextField placeholder="Enter name or email of the client" {...params} />}
              name="student_detail_id"
              control={control}
              error={Boolean(errors.student_detail_id)}
              helperText={errors.student_detail_id && errors.student_detail_id.message}
            />
          )}
        />
        <StyledTypography fontSize="16px" style={{ marginTop: '30px' }}>
          How often are we invoicing the client:
        </StyledTypography>
        <Controller
          as={
            <RadioGroup style={{ flexDirection: 'row', marginTop: '15px' }}>
              <StyledRadioFormControlLabel value="one_time" control={<StyledRadio />} label="One Time" />
              <StyledRadioFormControlLabel value="weekly" control={<StyledRadio />} label="Weekly" />
              <StyledRadioFormControlLabel value="bi_weekly" control={<StyledRadio />} label="Bi-weekly" />
            </RadioGroup>
          }
          name="invoicing_schedule"
          control={control}
        />
        <StyledTypography fontSize="16px" style={{ marginTop: '30px' }}>
          How are we billing the client:
        </StyledTypography>
        <Controller
          as={
            <RadioGroup style={{ marginTop: '15px' }}>
              <StyledRadioFormControlLabel
                value="custom_type"
                control={<StyledRadio />}
                label="Custom - Manually create Invoices and pay freelancers"
              />
              <StyledRadioFormControlLabel
                value="hourly_rate"
                control={<StyledRadio />}
                label="Hourly Rate - Invoice the hours billed by the freelancer on each billing cycle"
              />
            </RadioGroup>
          }
          name="student_type_of_billing"
          control={control}
        />
        <StyledTypography fontSize="16px" style={{ marginTop: '30px' }}>
          How much do we charge:
        </StyledTypography>
        <Box display="flex" alignItems="flex-start" style={{ marginTop: '15px' }}>
          <img style={{ marginTop: '15px' }} src={dollarIcon} alt="dollar" />
          <Controller
            as={<StyledTextField placeholder="Amount" />}
            name="student_payment_amount"
            control={control}
            type="number"
            error={Boolean(errors.student_payment_amount)}
            helperText={errors.student_payment_amount && errors.student_payment_amount.message}
            style={{ width: '100px', marginBottom: '20px', marginLeft: '5px' }}
          />
          {student_type_of_billing === 'hourly_rate' && (
            <StyledTypography style={{ marginTop: '17px', marginLeft: '15px' }} fontSize="16px">
              per hour
            </StyledTypography>
          )}
        </Box>
      </Box>
    </InfoBox>
  );
}

export default Client;

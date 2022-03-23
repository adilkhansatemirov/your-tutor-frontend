import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getAllClients } from 'services/admin/clients';
import theme from 'theme';
import { filterClientOptions } from 'utils/contracts';
import * as Yup from 'yup';
import StepDescription from '../StepDescription';
import StepNumber from '../StepNumber';
import StepTitle from '../StepTitle';
import previousIcon from 'assets/icons/arrow-left-gray.svg';

function Client({ setTemplate, newProject, setNewProject, setClient }) {
  const { showSnackbar } = useContext(SnackbarContext);

  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);

  const { handleSubmit, setValue, errors, control, trigger } = useForm({
    defaultValues: {
      client_detail_id: newProject.client_detail_id,
    },
    resolver: yupResolver(
      Yup.object().shape({
        client_detail_id: Yup.string().required('Name or email is required'),
      }),
    ),
  });

  useEffect(() => {
    getAllClients()
      .then((response) => {
        setClients(response.data.filter((client) => client.has_payment_info));

        const client = response.data.find((clientDetail) => clientDetail.id === newProject.client_detail_id);
        if (client) {
          setSelectedClient(client);
          setValue('client_detail_id', newProject.client_detail_id);
          trigger('client_detail_id');
        }
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
      });
    // eslint-disable-next-line
  }, []);

  const handleAutoCompleteValueChange = (event, value) => {
    setSelectedClient(value);
    setClient(value);
    setValue('client_detail_id', value ? value.id : '');
    trigger('client_detail_id');
  };

  const onSubmit = (values) => {
    setNewProject({ ...newProject, client_detail_id: Number(values.client_detail_id) });
    setTemplate('project-name');
  };

  return (
    <>
      <StepNumber stepNumber={1} />
      <StepTitle text="Client" />
      <StepDescription text="Firstly we need to know who is this project for. Use the form below to find the Client who will be accepting our services" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          options={clients}
          style={{ marginBottom: '20px' }}
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
              name="client_detail_id"
              control={control}
              error={Boolean(errors.client_detail_id)}
              helperText={errors.client_detail_id && errors.client_detail_id.message}
            />
          )}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledButton textTransform="uppercase" variant="light-blue" type="submit">
            Next
          </StyledButton>
          <StyledButton
            fontWeight="normal"
            variant="text"
            size="small"
            type="button"
            onClick={() => setTemplate('welcome')}
            color={theme.palette.textGray}
          >
            <img src={previousIcon} alt="arrow left" style={{ marginRight: '8px' }} /> Previous step
          </StyledButton>
        </Box>
      </form>
    </>
  );
}

export default Client;

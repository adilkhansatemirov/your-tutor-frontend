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
      student_detail_id: newProject.student_detail_id,
    },
    resolver: yupResolver(
      Yup.object().shape({
        student_detail_id: Yup.string().required('Name or email is required'),
      }),
    ),
  });

  useEffect(() => {
    getAllClients()
      .then((response) => {
        setClients(response.data.filter((client) => client.has_payment_info));

        const client = response.data.find((clientDetail) => clientDetail.id === newProject.student_detail_id);
        if (client) {
          setSelectedClient(client);
          setValue('student_detail_id', newProject.student_detail_id);
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
    setClient(value);
    setValue('student_detail_id', value ? value.id : '');
    trigger('student_detail_id');
  };

  const onSubmit = (values) => {
    setNewProject({ ...newProject, student_detail_id: Number(values.student_detail_id) });
    setTemplate('project-name');
  };

  return (
    <>
      <StepNumber stepNumber={1} />
      <StepTitle text="Student" />
      <StepDescription text="Firstly we need to know who is this project for. Use the form below to find the student who will be accepting our services." />
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
              <StyledTypography fontWeight="regular" fontSize="18px">
                {option.user.first_name} {option.user.last_name}
              </StyledTypography>
              <StyledTypography style={{ fontSize: '16px', opacity: 0.8 }}>{option.user.email}</StyledTypography>
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledButton variant="dark-blue" type="submit">
            Next
          </StyledButton>
          <StyledButton
            fontWeight="normal"
            variant="transparent"
            size="small"
            //textUnderlineOffset='4px'
            type="button"
            onClick={() => setTemplate('welcome')}
            color={theme.palette.textGray}
            // textDecorationLine="underline"
          >
             Previous step
          </StyledButton>
        </Box>
      </form>
    </>
  );
}

export default Client;

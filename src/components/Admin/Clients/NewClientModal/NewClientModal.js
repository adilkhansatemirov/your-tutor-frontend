import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import { SnackbarContext } from 'context/snackbarContext';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import newClientValidationSchema from './NewClientModal.validate';
import { createClient } from 'services/admin/clients';
import StyledModal from 'components/Shared/UI/StyledModal';

function NewClientModal({ open, onClose, fetchClients }) {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      company_name: '',
    },
    resolver: yupResolver(newClientValidationSchema),
  });

  const onSubmit = (values) => {
    setLoading(true);
    createClient(values)
      .then(() => {
        setLoading(false);
        showSnackbar('You have created new client', 'success');
        fetchClients();
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 422) {
          showSnackbar('User already exists', 'error');
        } else {
          showSnackbar('Somewthing went wrong', 'error');
        }
        onClose();
      });
  };

  return (
    <StyledModal open={open} onClose={onClose} loading={loading} header="Add Client">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex">
          <Controller
            as={<StyledTextField fontFamily="Poppins" />}
            small
            style={{ marginRight: '15px', width: '100%' }}
            placeholder="First name"
            name="first_name"
            type="text"
            error={Boolean(errors.first_name)}
            control={control}
            helperText={errors.first_name && errors.first_name.message}
          />
          <Controller
            as={<StyledTextField fontFamily="Poppins" />}
            small
            style={{ width: '100%' }}
            placeholder="Last name"
            name="last_name"
            type="text"
            error={Boolean(errors.last_name)}
            control={control}
            helperText={errors.last_name && errors.last_name.message}
          />
        </Box>
        <Controller
          as={<StyledTextField fontFamily="Poppins" />}
          small
          placeholder="Email"
          error={Boolean(errors.email)}
          fullWidth
          style={{ marginTop: '15px' }}
          name="email"
          control={control}
          autoComplete="email"
          helperText={errors.email && errors.email.message}
        />
        <Controller
          as={<StyledTextField fontFamily="Poppins" />}
          small
          placeholder="Company name"
          name="company_name"
          fullWidth
          style={{ marginTop: '15px' }}
          type="text"
          error={Boolean(errors.company_name)}
          control={control}
          helperText={errors.company_name && errors.company_name.message}
        />
        <StyledButton
          style={{ marginTop: '15px' }}
          fullWidth
          textTransform="uppercase"
          type="submit"
          size="normal"
          variant="dark-blue"
          fontFamily="Poppins"
        >
          <StyledTypography fontFamily="Rubik" color="white" fontWeight="bold" fontSize={12}>
            Add client
          </StyledTypography>
        </StyledButton>
      </form>
    </StyledModal>
  );
}

export default NewClientModal;

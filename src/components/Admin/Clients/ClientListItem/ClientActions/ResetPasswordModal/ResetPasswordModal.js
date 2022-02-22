import { useState } from 'react';
import { resetPassword } from 'services/userManagement';
import { useContext } from 'react';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledButton from 'components/Shared/Styled/StyledButton';
import { SnackbarContext } from 'context/snackbarContext';
import resetPasswordValidationSchema from './ResetPasswordModal.validate';
import StyledModal from 'components/Shared/UI/StyledModal';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

function ResetPasswordModal({ open, onClose, client }) {
  const { showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(false);
  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      password: '',
      confirmationPassword: '',
    },
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    resetPassword({ email: client.user.email, password: values.password })
      .then(() => {
        showSnackbar('Password changed', 'success');
        setLoading(false);
        onClose(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setLoading(false);
        onClose(false);
      });
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      loading={loading}
      // header={`Change password to user ${client.user.first_name} ${client.user.last_name}`}
      header="Reset password"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<StyledTextField />}
          placeholder="Password"
          small
          name="password"
          fullWidth
          type="password"
          error={Boolean(errors.password)}
          control={control}
          helperText={errors.password && errors.password.message}
        />
        <Controller
          as={<StyledTextField />}
          placeholder="Confirm Password"
          small
          name="confirmationPassword"
          fullWidth
          style={{ marginTop: '15px' }}
          type="password"
          error={Boolean(errors.confirmationPassword)}
          control={control}
          helperText={errors.confirmationPassword && errors.confirmationPassword.message}
        />
        <StyledButton
          style={{ marginTop: '15px' }}
          textTransform="uppercase"
          variant="light-blue"
          type="submit"
          fullWidth
        >
          <StyledTypography fontFamily="Rubik" color="white" fontWeight="bold" fontSize={12}>
            Confirm
          </StyledTypography>
        </StyledButton>
      </form>
    </StyledModal>
  );
}

export default ResetPasswordModal;

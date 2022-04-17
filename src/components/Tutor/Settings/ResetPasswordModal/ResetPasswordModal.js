import { useState } from 'react';
import { resetPassword } from 'services/userManagement';
import { useContext } from 'react';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import { Box } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledButton from 'components/Shared/Styled/StyledButton';
import { SnackbarContext } from 'context/snackbarContext';
import resetPasswordValidationSchema from './ResetPasswordModal.validate';
import StyledModal from 'components/Shared/UI/StyledModal';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

function ResetPasswordModal({ open, onClose, handleCloseResetPasswordModal, freelancer }) {
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
    resetPassword({ email: freelancer.email, password: values.password })
      .then(() => {
        showSnackbar('Password changed', 'success');
        setLoading(false);
        handleCloseResetPasswordModal(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setLoading(false);
        handleCloseResetPasswordModal(false);
      });
  };

  return (
    <StyledModal open={open} onClose={onClose} header="Reset Password" loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex">
          <Controller
            as={<StyledTextField />}
            small
            placeholder="New password"
            name="password"
            fullWidth
            type="password"
            error={Boolean(errors.password)}
            control={control}
            helperText={errors.password && errors.password.message}
          />
          <Controller
            as={<StyledTextField />}
            small
            placeholder="Repeat new password"
            name="confirmationPassword"
            fullWidth
            style={{ marginLeft: '15px' }}
            type="password"
            error={Boolean(errors.confirmationPassword)}
            control={control}
            helperText={errors.confirmationPassword && errors.confirmationPassword.message}
          />
        </Box>

        <StyledButton
          style={{ marginTop: '15px' }}
          textTransform="uppercase"
          variant="dark-blue"
          type="submit"
          fullWidth
        >
          <StyledTypography fontFamily="Rubik" color="white" fontWeight="bold" fontSize={12}>
            Save
          </StyledTypography>
        </StyledButton>
      </form>
    </StyledModal>
  );
}

export default ResetPasswordModal;

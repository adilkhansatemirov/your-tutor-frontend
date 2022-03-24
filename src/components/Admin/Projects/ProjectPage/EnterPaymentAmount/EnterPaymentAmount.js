import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import enterCodeValidationSchema from './EnterPaymentAmount.validate';
import { payFreelancer } from 'services/admin/projects';
import { SnackbarContext } from 'context/snackbarContext';
import StyledModal from 'components/Shared/UI/StyledModal';

function EnterPaymentAmount({ open, close, project, fetchProject }) {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(enterCodeValidationSchema),
    defaultValues: {
      amount: '',
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    payFreelancer(project.id, { payment_data: { payment_amount: values.amount } })
      .then(() => {
        setLoading(false);
        fetchProject();
        close();
        showSnackbar('Freelancer has been paid successfully', 'success');
      })
      .catch((error) => {
        setLoading(false);
        fetchProject();
        close();
        if (error.response) {
          showSnackbar(error.response.data.message, 'error');
        } else {
          showSnackbar('Something went wrong', 'error');
        }
      });
  };

  return (
    <StyledModal header="Payment amount" open={open} onClose={close} loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<StyledTextField fontFamily="Poppins" />}
          placeholder={`$${project.tutor_payment_amount}`}
          small
          fullWidth
          name="amount"
          type="number"
          autoComplete="none"
          error={Boolean(errors.price)}
          control={control}
          helperText={errors.amount && errors.amount.message}
        />
        <StyledButton
          style={{ marginTop: '24px' }}
          type="submit"
          fullWidth
          size="normal"
          variant="light-blue"
          fontFamily="Rubik"
        >
          Confirm
        </StyledButton>
      </form>
    </StyledModal>
  );
}

export default EnterPaymentAmount;

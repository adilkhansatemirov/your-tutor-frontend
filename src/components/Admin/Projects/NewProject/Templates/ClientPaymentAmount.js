import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { Controller, useForm } from 'react-hook-form';
import theme from 'theme';
import * as Yup from 'yup';
import StepDescription from '../StepDescription';
import StepNumber from '../StepNumber';
import StepTitle from '../StepTitle';
import previousIcon from 'assets/icons/arrow-left-gray.svg';
import dollarIcon from 'assets/icons/dollar-black.svg';

function ClientPaymentAmount({ setTemplate, newProject, setNewProject }) {
  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      student_payment_amount: newProject.student_payment_amount,
    },
    resolver: yupResolver(
      Yup.object().shape({
        student_payment_amount: Yup.string().required('Required'),
      }),
    ),
  });

  const onSubmit = (values) => {
    setNewProject({ ...newProject, student_payment_amount: Number(values.student_payment_amount) });
    setTemplate('freelancer-payment-amount');
  };

  return (
    <>
      <StepNumber stepNumber={3} />
      <StepTitle text="Billing" />
      <StepDescription text="How much do we charge:" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="flex-start">
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
          {newProject.student_type_of_billing === 'hourly_rate' && (
            <StyledTypography style={{ marginTop: '17px', marginLeft: '15px' }} fontSize="16px">
              per hour
            </StyledTypography>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledButton textTransform="uppercase" variant="light-blue" type="submit">
            Next
          </StyledButton>
          <StyledButton
            fontWeight="normal"
            variant="text"
            size="small"
            type="button"
            onClick={() => setTemplate('client-type-of-billing')}
            color={theme.palette.textGray}
          >
            <img src={previousIcon} alt="arrow left" style={{ marginRight: '8px' }} /> Previous step
          </StyledButton>
        </Box>
      </form>
    </>
  );
}

export default ClientPaymentAmount;

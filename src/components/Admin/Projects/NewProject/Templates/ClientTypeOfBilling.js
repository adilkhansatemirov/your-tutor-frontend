import { Box, RadioGroup } from '@material-ui/core';
import StyledRadio from 'components/Shared/Styled/Radio/StyledRadio';
import StyledRadioFormControlLabel from 'components/Shared/Styled/Radio/StyledRadioFormControlLabel';
import StyledButton from 'components/Shared/Styled/StyledButton';
import { Controller, useForm } from 'react-hook-form';
import theme from 'theme';
import StepDescription from '../StepDescription';
import StepNumber from '../StepNumber';
import StepTitle from '../StepTitle';
import previousIcon from 'assets/icons/arrow-left-gray.svg';

function ClientTypeOfBilling({ setTemplate, newProject, setNewProject }) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      client_type_of_billing: newProject.client_type_of_billing,
    },
  });

  const onSubmit = (values) => {
    setNewProject({ ...newProject, client_type_of_billing: values.client_type_of_billing });
    setTemplate('client-payment-amount');
  };

  return (
    <>
      <StepNumber stepNumber={3} />
      <StepTitle text="Billing." />
      <StepDescription text="How are we billing the client:" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={
            <RadioGroup style={{ marginBottom: '10px' }}>
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
          name="client_type_of_billing"
          control={control}
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
            onClick={() => setTemplate('invoicing-schedule')}
            color={theme.palette.textGray}
          >
            <img src={previousIcon} alt="arrow left" style={{ marginRight: '8px' }} /> Previous step
          </StyledButton>
        </Box>
      </form>
    </>
  );
}

export default ClientTypeOfBilling;

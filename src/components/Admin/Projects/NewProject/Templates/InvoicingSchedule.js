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

function InvoicingSchedule({ setTemplate, newProject, setNewProject }) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      invoicing_schedule: newProject.invoicing_schedule,
    },
  });

  const onSubmit = (values) => {
    setNewProject({ ...newProject, invoicing_schedule: values.invoicing_schedule });
    setTemplate('client-type-of-billing');
  };

  return (
    <>
      <StepNumber stepNumber={3} />
      <StepTitle text="Billing" />
      <StepDescription text="How often are we invoicing the client:" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={
            <RadioGroup style={{ flexDirection: 'row', marginBottom: '10px' }}>
              <StyledRadioFormControlLabel value="one_time" control={<StyledRadio />} label="One Time" />
              <StyledRadioFormControlLabel disabled value="weekly" control={<StyledRadio />} label="Weekly" />
              <StyledRadioFormControlLabel disabled value="bi_weekly" control={<StyledRadio />} label="Bi-weekly" />
            </RadioGroup>
          }
          name="invoicing_schedule"
          control={control}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledButton variant="dark-blue" type="submit">
            Next
          </StyledButton>
          <StyledButton
            fontWeight="normal"
            variant="transparent"
            size="small"
            type="button"
            onClick={() => setTemplate('duration')}
            color={theme.palette.textGray}
          >
             Previous step
          </StyledButton>
        </Box>
      </form>
    </>
  );
}

export default InvoicingSchedule;

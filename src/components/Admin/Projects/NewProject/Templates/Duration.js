import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, MenuItem } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledSelect from 'components/Shared/Styled/StyledSelect';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import { Controller, useForm } from 'react-hook-form';
import theme from 'theme';
import * as Yup from 'yup';
import StepDescription from '../StepDescription';
import StepNumber from '../StepNumber';
import StepTitle from '../StepTitle';
import previousIcon from 'assets/icons/arrow-left-gray.svg';

function Duration({ setTemplate, newProject, setNewProject }) {
  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      durationAmount: newProject.project_duration.split(' ')[0],
      durationMeasure: newProject.project_duration.split(' ')[1] || 'Hours',
    },
    resolver: yupResolver(
      Yup.object().shape({
        durationAmount: Yup.string().required('Project duration is required'),
        durationMeasure: Yup.string().required('Project duration is required'),
      }),
    ),
  });

  const onSubmit = (values) => {
    setNewProject({ ...newProject, project_duration: `${values.durationAmount} ${values.durationMeasure}` });
    setTemplate('invoicing-schedule');
  };

  return (
    <>
      <StepNumber stepNumber={2} />
      <StepTitle text="Tell us a little bit about the lesson" />
      <StepDescription text="How long do you think would the project last? Tutors would be able to see the approximate length of the course." />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" marginBottom="20px">
          <Controller
            as={<StyledTextField fontFamily="Roboto" />}
            placeholder="Duration"
            name="durationAmount"
            type="number"
            error={Boolean(errors.durationAmount)}
            control={control}
            helperText={errors.durationAmount && errors.durationAmount.message}
          />
          <FormControl variant="outlined">
            <Controller
              as={
                <StyledSelect
                  labelId="measure-label"
                  style={{ marginLeft: '8px' }}
                  error={Boolean(errors.durationMeasure)}
                >
                  <MenuItem value="Hours">Hours</MenuItem>
                  <MenuItem value="Days">Days</MenuItem>
                  <MenuItem value="Months">Months</MenuItem>
                </StyledSelect>
              }
              control={control}
              name="durationMeasure"
              error={Boolean(errors.durationMeasure)}
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledButton  variant="dark-blue" type="submit">
            Next
          </StyledButton>
          <StyledButton
            fontWeight="normal"
            variant="transparent"
            size="small"
            type="button"
            onClick={() => setTemplate('description')}
            color={theme.palette.textGray}
          >
             Previous step
          </StyledButton>
        </Box>
      </form>
    </>
  );
}

export default Duration;

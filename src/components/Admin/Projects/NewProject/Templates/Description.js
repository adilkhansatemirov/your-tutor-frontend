import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import { Controller, useForm } from 'react-hook-form';
import theme from 'theme';
import * as Yup from 'yup';
import StepDescription from '../StepDescription';
import StepNumber from '../StepNumber';
import StepTitle from '../StepTitle';
import previousIcon from 'assets/icons/arrow-left-gray.svg';

function Description({ setTemplate, newProject, setNewProject }) {
  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      description: newProject.description,
    },
    resolver: yupResolver(
      Yup.object().shape({
        description: Yup.string().required('Project description is required'),
      }),
    ),
  });

  const onSubmit = (values) => {
    setNewProject({ ...newProject, description: values.description });
    setTemplate('duration');
  };

  return (
    <>
      <StepNumber stepNumber={2} />
      <StepTitle text="Tell us a little bit about the lesson" />
      <StepDescription text="What’s the description of this lesson. Tutors would be able to see the description of the project." />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<StyledTextField placeholder="Project description" />}
          name="description"
          multiline
          rows={4}
          control={control}
          error={Boolean(errors.description)}
          helperText={errors.description && errors.description.message}
          style={{ height: 'auto', marginBottom: '20px' }}
          fullWidth
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
            onClick={() => setTemplate('project-name')}
            color={theme.palette.textGray}
          >
             Previous step
          </StyledButton>
        </Box>
      </form>
    </>
  );
}

export default Description;

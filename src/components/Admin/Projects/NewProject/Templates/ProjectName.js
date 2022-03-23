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

function ProjectName({ setTemplate, newProject, setNewProject }) {
  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      projectName: newProject.title,
    },
    resolver: yupResolver(
      Yup.object().shape({
        projectName: Yup.string().required('Project name is required'),
      }),
    ),
  });

  const onSubmit = (values) => {
    setNewProject({ ...newProject, title: values.projectName });
    setTemplate('description');
  };

  return (
    <>
      <StepNumber stepNumber={2} />
      <StepTitle text="Tell us a little bit about the Project." />
      <StepDescription text="What's the name of this project. Please try to give it a unique name so it would be easier to find this project later on." />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<StyledTextField placeholder="Project name" />}
          name="projectName"
          control={control}
          error={Boolean(errors.projectName)}
          helperText={errors.projectName && errors.projectName.message}
          style={{ marginBottom: '20px' }}
          fullWidth
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
            onClick={() => setTemplate('client')}
            color={theme.palette.textGray}
          >
            <img src={previousIcon} alt="arrow left" style={{ marginRight: '8px' }} /> Previous step
          </StyledButton>
        </Box>
      </form>
    </>
  );
}

export default ProjectName;

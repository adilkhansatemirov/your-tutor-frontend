import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { updateProject } from 'services/admin/projects';
import validationSchema from './EditProject.validate';
import Project from './Sections/Project';
import Client from './Sections/Client';
import Freelancer from './Sections/Freelancer';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

function EditProject({ project }) {
  const { showSnackbar } = useContext(SnackbarContext);
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const { handleSubmit, errors, control, setValue, trigger, watch } = useForm({
    defaultValues: {
      title: project.title,
      description: project.description,
      student_detail_id: project.student_detail.id,
      invoicing_schedule: project.invoicing_schedule,
      student_type_of_billing: project.student_type_of_billing,
      student_payment_amount: project.student_payment_amount,
      tutor_payment_amount: project.tutor_payment_amount,
      tutor_detail_id: project.tutor_detail ? project.tutor_detail.id : null,
    },
    resolver: yupResolver(validationSchema(project)),
  });

  const onSubmit = (values) => {
    setSubmitting(true);
    const projectData = { ...values };

    if (project.freelancer_detail === null && values.tutor_detail_id) {
      projectData.project_status = 'active';
    }

    updateProject(project.id, projectData)
      .then(() => {
        showSnackbar('Project has been updated', 'success');
        history.push(`/admin/projects/${project.id}`);
      })
      .catch(() => {
        setSubmitting(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: '25px' }}>
        <StyledTypography fontWeight="medium" fontSize="22px" fontFamily="Rubik">
          {project.title}
        </StyledTypography>
        <Box>
          <StyledButton
            disabled={submitting}
            onClick={() => handleSubmit(onSubmit)()}
            textTransform="uppercase"
            variant="dark-blue"
            size="small"
            style={{ marginRight: '10px' }}
          >
            Save
          </StyledButton>
          <Link to={`/admin/projects/${project.id}`} style={{ textDecoration: 'none' }}>
            <StyledButton disabled={submitting} textTransform="uppercase" variant="outlined-dark-blue" size="small">
              cancel
            </StyledButton>
          </Link>
        </Box>
      </Box>
      <Project control={control} errors={errors} />
      <Client
        control={control}
        errors={errors}
        setValue={setValue}
        trigger={trigger}
        project={project}
        student_type_of_billing={watch('student_type_of_billing')}
      />
      <Freelancer
        control={control}
        errors={errors}
        setValue={setValue}
        trigger={trigger}
        project={project}
        student_type_of_billing={watch('student_type_of_billing')}
      />
    </>
  );
}

export default EditProject;

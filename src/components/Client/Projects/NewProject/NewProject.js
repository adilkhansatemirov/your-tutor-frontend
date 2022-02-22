import { Box } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { SnackbarContext } from 'context/snackbarContext';
import InfoBox from 'components/Shared/UI/InfoBox';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import { createProject } from 'services/client/projects';
import dollarIcon from 'assets/icons/dollar-black.svg';

function NewProject() {
  const { showSnackbar } = useContext(SnackbarContext);
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      title: '',
      description: '',
      client_payment_amount: 0,
    },
    resolver: yupResolver(
      Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        client_payment_amount: Yup.number()
          .transform((castedValue, initialValue) => (initialValue === '' ? undefined : castedValue))
          .typeError('Client payment amount must be number')
          .required('Client payment amount is required'),
      }),
    ),
  });

  const onSubmit = (values) => {
    setSubmitting(true);
    const projectData = { ...values };
    console.log('projectData', projectData);
    createProject({ project_data: projectData })
      .then(() => {
        showSnackbar('Project has been created', 'success');
        history.push(`/client/projects`);
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
          New Project
        </StyledTypography>
        <Box>
          <StyledButton
            disabled={submitting}
            onClick={() => handleSubmit(onSubmit)()}
            textTransform="uppercase"
            variant="light-blue"
            size="small"
            style={{ marginRight: '10px' }}
          >
            Save
          </StyledButton>
          <Link to={`/client/projects`} style={{ textDecoration: 'none' }}>
            <StyledButton disabled={submitting} textTransform="uppercase" variant="outlined-dark-blue" size="small">
              cancel
            </StyledButton>
          </Link>
        </Box>
      </Box>
      <form>
        <InfoBox style={{ marginTop: '35px' }}>
          <Box style={{ width: '65%' }}>
            <StyledTypography fontWeight="medium" fontSize="17px">
              Project
            </StyledTypography>
            <StyledTypography fontSize="16px" style={{ marginTop: '20px' }}>
              What's the name of this project. Please try to give it a unique name so it would be easier to find this
              project later on.
            </StyledTypography>
            <Controller
              as={<StyledTextField fontFamily="Poppins" />}
              placeholder="Project title"
              style={{ marginTop: '20px' }}
              name="title"
              type="text"
              error={Boolean(errors.title)}
              control={control}
              helperText={errors.title && errors.title.message}
              fullWidth
            />
            <StyledTypography fontSize="16px" style={{ marginTop: '20px' }}>
              Give a short description of the project. Freelancers would be able to see the description of the project.
            </StyledTypography>
            <Controller
              as={<StyledTextField placeholder="Project description" />}
              name="description"
              multiline
              rows={4}
              control={control}
              error={Boolean(errors.description)}
              helperText={errors.description && errors.description.message}
              style={{ height: 'auto', marginTop: '20px' }}
              fullWidth
            />
            <StyledTypography fontSize="16px" style={{ marginTop: '30px' }}>
              How much do we charge:
            </StyledTypography>
            <Box display="flex" alignItems="flex-start" style={{ marginTop: '15px' }}>
              <img style={{ marginTop: '15px' }} src={dollarIcon} alt="dollar" />
              <Controller
                as={<StyledTextField placeholder="Amount" />}
                name="client_payment_amount"
                control={control}
                type="number"
                error={Boolean(errors.client_payment_amount)}
                helperText={errors.client_payment_amount && errors.client_payment_amount.message}
                style={{ width: '100px', marginBottom: '20px', marginLeft: '5px' }}
              />
            </Box>
          </Box>
        </InfoBox>
      </form>
    </>
  );
}

export default NewProject;

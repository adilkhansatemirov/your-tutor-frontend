import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import signUpValidationSchema from './SignUp.validate';
import { SnackbarContext } from 'context/snackbarContext';
import useStyles from '../Modal.style';
import { AuthContext } from 'context/authContext';
import { signUpWithEmailAndPassword } from 'services/auth';
import { modalTemplates } from 'constants/constants';

function SignUp({ setModalTemplate }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const { setUserCredentials } = useContext(AuthContext);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    signUpWithEmailAndPassword(values)
      .then(() => {
        setLoading(false);
        showSnackbar('You are successfully registered', 'success');
        setUserCredentials({ email: values.email, password: values.password });
        setModalTemplate(modalTemplates.enterCode);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 422) {
          showSnackbar('User already exists', 'error');
        } else {
          showSnackbar('Somewthing went wrong', 'error');
        }
      });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {loading ? (
        <CircularProgress style={{ margin: '0 auto 20px' }} />
      ) : (
        <>
          <Box className={classes.inputWrapper}>
            <Controller
              as={<StyledTextField fontFamily="Poppins" />}
              placeholder="First name"
              name="first_name"
              type="text"
              small
              error={Boolean(errors.first_name)}
              control={control}
              helperText={errors.first_name && errors.first_name.message}
              fullWidth
            />
            <Controller
              as={<StyledTextField fontFamily="Poppins" />}
              placeholder="Last name"
              style={{ marginLeft: '10px' }}
              name="last_name"
              type="text"
              small
              error={Boolean(errors.last_name)}
              control={control}
              helperText={errors.last_name && errors.last_name.message}
              fullWidth
            />
          </Box>
          <Controller
            as={<StyledTextField fontFamily="Poppins" />}
            placeholder="Email"
            error={Boolean(errors.email)}
            name="email"
            style={{ marginTop: '10px' }}
            control={control}
            fullWidth
            small
            autoComplete="email"
            helperText={errors.email && errors.email.message}
          />
          <Controller
            as={<StyledTextField fontFamily="Poppins" />}
            placeholder="Password"
            name="password"
            type="password"
            style={{ marginTop: '10px' }}
            fullWidth
            small
            autoComplete="current-password"
            error={Boolean(errors.password)}
            control={control}
            helperText={errors.password && errors.password.message}
          />
          <StyledButton
            className={classes.submitButton}
            type="submit"
            size="normal"
            variant="blue"
            fontFamily="Poppins"
          >
            Next
          </StyledButton>
          <StyledTypography fontFamily="Poppins" className={classes.footerWrapper}>
            Already have an account?{' '}
            <Link to="/sign-in" style={{ textDecoration: 'none' }}>
              Sign In
            </Link>
          </StyledTypography>
        </>
      )}
    </form>
  );
}

export default SignUp;

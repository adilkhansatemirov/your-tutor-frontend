import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { CircularProgress, InputAdornment, Box } from '@material-ui/core';
import { signInTemplates } from 'constants/constants';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { SnackbarContext } from 'context/snackbarContext';
import { AuthContext } from 'context/authContext';
import useStyles from './SignIn.style';

import { signInWithEmailAndPassword } from 'services/auth';
import FastIcon from 'components/Shared/Utils/FastIcon';

function SignInPass({ email, setEmail, setTemplate }) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const { setUserCredentials, setUser, refererPage } = useContext(AuthContext);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        password: Yup.string().min(6, 'Password needs to be more then 6 characters').required('Password is required'),
      }),
    ),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    signInWithEmailAndPassword({ email, password: values.password })
      .then(({ data }) => {
        setUser(data);
        const role = data.user.role;
        const freelancerDetail = data.freelancer_detail;
        if (data.user.is_blocked) {
          showSnackbar('Your accaunt has been blocked, so you cannot access the app', 'error');
          history.push('/');
          return;
        }

        let path = '/';
        if (role === 'admin') {
          path = '/admin/projects';
        } else if (role === 'freelancer') {
          if (freelancerDetail.qualified) {
            path = '/tutor/dashboard';
          } else if (freelancerDetail.interview_scheduled) {
            path = '/tutor-application/done';
          } else {
            path = '/tutor-application/resume';
          }
        } else if (role === 'client') {
          if (data.has_payment_info) {
            path = '/client/invoices';
          } else {
            path = '/client-application/payment-info';
          }
        }
        showSnackbar('You have successfully logged in', 'success');

        if (refererPage) {
          path = refererPage;
        }
        history.push(path);
      })
      .catch((error) => {
        setLoading(false);
        showSnackbar(error.response.data.error, 'error');
        if (error.response.status === 428) {
          setUserCredentials({ email, password: values.password });
          history.push('/enter-code');
        }
      });
  };

  const handleForgotPassword = () => {
    history.push('/forgot-password');
  };

  const handleChangeEmail = () => {
    setEmail(null);
    setTemplate(signInTemplates.signInEmail);
  };

  return (
    <>
      <StyledTypography fontFamily="Poppins" fontSize={33} className={classes.title} type="h1" fontWeight="bold">
        Sign In
      </StyledTypography>
      {loading ? (
        <CircularProgress style={{ margin: '0 auto 20px' }} />
      ) : (
        <>
          <StyledTypography fontSize={18} fontFamily="Poppins" className={classes.email} type="h6">
            {email}
          </StyledTypography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <StyledTypography fontFamily="Poppins" className={classes.text}>
              Enter your password
            </StyledTypography>
            <Controller
              as={
                <StyledTextField
                  className={classes.input}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <FastIcon width="13" height="18" iconName="lock" />
                      </InputAdornment>
                    ),
                  }}
                  fontFamily="Poppins"
                />
              }
              placeholder="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              control={control}
              helperText={errors.password && errors.password.message}
            />
            <Box className={classes.acitonsWrapper}>
              <Box onClick={handleForgotPassword} className={classes.actionsItem}>
                <FastIcon className={classes.actionIcon} width="14" height="18" iconName="lockQuestion" />
                <StyledTypography>Forgot password</StyledTypography>
              </Box>
              <Box onClick={handleChangeEmail} className={classes.actionsItem}>
                <FastIcon className={classes.actionIcon} width="15" height="13" iconName="mail" />
                <StyledTypography>Use different email</StyledTypography>
              </Box>
            </Box>
            <StyledButton className={classes.button} fontFamily="Poppins" type="submit" size="normal" variant="blue">
              Next
            </StyledButton>
          </form>
        </>
      )}
    </>
  );
}

export default SignInPass;

import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { CircularProgress } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import useStyles from './ResetPassword.style';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { SnackbarContext } from 'context/snackbarContext';
import { resetPasswordByToken } from 'services/userManagement';
import { signInWithEmailAndPassword } from 'services/auth';
import { AuthContext } from 'context/authContext';
import AuthLayout from '../AuthLayout';

function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const { setUserCredentials, setUser } = useContext(AuthContext);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        password: Yup.string()
          .min(6, 'Password needs to be more then 6 characters')
          .required('New password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirmation of new password is required'),
      }),
    ),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values) => {
    setLoading(true);

    resetPasswordByToken({
      token: {
        reset_password_token: location.search.split('=')[1],
        password: values.password,
        password_confirmation: values.password,
      },
    })
      .then((response) => {
        const { email } = response.data.user;
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
            } else if (role === 'tutor') {
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
      })
      .catch(() => {
        showSnackbar('Your reset password link is now invalid. Please request a new one', 'error');
        setLoading(false);
        history.push('/');
      });
  };

  return (
    <AuthLayout>
      <StyledTypography fontFamily="Poppins" fontSize="30px" type="h1" fontWeight="bold">
        Reset password
      </StyledTypography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {loading ? (
          <CircularProgress style={{ margin: '0 auto 20px' }} />
        ) : (
          <>
            <Controller
              as={<StyledTextField fontFamily="Poppins" />}
              fullWidth
              placeholder="New password"
              name="password"
              type="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              control={control}
              helperText={errors.password && errors.password.message}
            />
            <Controller
              as={<StyledTextField fontFamily="Poppins" />}
              fullWidth
              style={{ marginTop: '10px' }}
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              autoComplete="current-password"
              error={Boolean(errors.confirmPassword)}
              control={control}
              helperText={errors.confirmPassword && errors.confirmPassword.message}
            />
            <StyledButton className={classes.button} fontFamily="Poppins" type="submit" size="normal" variant="blue">
              Next
            </StyledButton>
          </>
        )}
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;

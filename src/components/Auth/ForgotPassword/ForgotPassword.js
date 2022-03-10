import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { CircularProgress, Box } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import useStyles from './ForgotPassword.style';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { SnackbarContext } from 'context/snackbarContext';
import { forgotPassword } from 'services/auth';
import { useHistory } from 'react-router-dom';
import AuthLayout from '../AuthLayout';

function ForgotPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().email('Email address is invalid').required('Email address is required'),
      }),
    ),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    forgotPassword({ email: values.email })
      .then(() => {
        history.push('/sign-in');
        showSnackbar('You will receive a reset link on your email', 'success');
      })
      .catch(() => {
        showSnackbar('User does not exist', 'error');
        setLoading(false);
      });
  };

  const handleCancel = () => {
    history.push('/sign-in');
  };

  return (
    <AuthLayout>
      <StyledTypography fontFamily="Poppins" className={classes.title} type="h1" weight="bold">
        Forgot password?
      </StyledTypography>
      <StyledTypography fontFamily="Poppins" type="h6" weight="regular" className={classes.text}>
        Enter your email address and we'll send you a link to reset your password
      </StyledTypography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {loading ? (
          <CircularProgress style={{ margin: '0 auto 20px' }} />
        ) : (
          <>
            <Controller
              as={<StyledTextField className={classes.input} fontFamily="Poppins" />}
              placeholder="Your email"
              error={Boolean(errors.email)}
              name="email"
              control={control}
              autoComplete="email"
              fullWidth
              helperText={errors.email && errors.email.message}
            />
            <Box>
              <StyledButton fontFamily="Poppins" type="submit" variant="blue">
                Next
              </StyledButton>
              <StyledButton onClick={handleCancel} style={{ marginLeft: '15px' }} fontFamily="Poppins" variant="outlined-dark-blue">
                Cancel
              </StyledButton>
            </Box>
          </>
        )}
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;

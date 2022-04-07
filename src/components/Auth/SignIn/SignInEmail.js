import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { CircularProgress, InputAdornment } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { SnackbarContext } from 'context/snackbarContext';
import { checkUserEmail } from 'services/auth';
import FastIcon from 'components/Shared/Utils/FastIcon';
import { signInTemplates } from 'constants/constants';
import useStyles from './SignIn.style';

function SignInMail({ setEmail, setTemplate }) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().email('Email address is invalid').required('Email address is required'),
      })
    ),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    checkUserEmail({ email: values.email })
      .then(() => {
        setEmail(values.email);
        setLoading(false);
        setTemplate(signInTemplates.signInPassword);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 428) {
            history.push('/check-email');
            return;
          } else if (error.response.status === 401) {
            showSnackbar('User does not exist', 'error');
          }
        } else {
          showSnackbar('Something went wrong', 'error');
        }
        setLoading(false);
      });
  };

  return (
    <>
      <StyledTypography fontFamily="Roboto" fontSize={36} className={classes.title} type="h1" fontWeight="medium" style={{ marginTop: '15px' }}>
        Sign-in
      </StyledTypography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {loading ? (
          <CircularProgress style={{ margin: '0 auto 20px' }} />
        ) : (
          <>
            <StyledTypography fontFamily="Roboto" fontSize={14} className={classes.text}>
             Enter your login
            </StyledTypography>
            <Controller
              as={<StyledTextField />}
              className={classes.input}
              //placeholder="Your email"
              error={Boolean(errors.email)}
              name="email"
              control={control}
              autoComplete="email"
              helperText={errors.email && errors.email.message}
            />
            <StyledButton className={classes.button} fontFamily="Roboto" type="submit" size="normal" variant="yellow">
              Next
            </StyledButton>
          </>
        )}
      </form>
    </>
  );
}

export default SignInMail;

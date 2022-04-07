import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { CircularProgress } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import useStyles from './EnterCode.style';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { SnackbarContext } from 'context/snackbarContext';
import { AuthContext } from 'context/authContext';
import { signInWithEmailAndPassword, enterSignUpCode } from 'services/auth';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout from '../AuthLayout';

function EnterCode() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { userCredentials, setUser } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        enterCode: Yup.string().required('Enter code is required'),
      }),
    ),
    defaultValues: {
      enterCode: '',
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    enterSignUpCode(userCredentials.email, values.enterCode)
      .then(() => {
        signInWithEmailAndPassword(userCredentials)
          .then(({ data }) => {
            setUser(data);
            const user = data.user;
            const freelancerDetail = data.freelancer_detail;
            setLoading(false);
            if (user.role === 'admin') {
              history.push('/admin/projects');
            } else if (user.role === 'tutor') {
              if (freelancerDetail.qualified) {
                history.push('/tutor/dashboard');
              } else if (freelancerDetail.interview_scheduled) {
                history.push('/tutor-application/done');
              } else {
                history.push('/tutor-application/resume');
              }
            }
            showSnackbar('You have successfully logged in', 'success');
          })
          .catch(() => {
            setLoading(false);
            showSnackbar('Something went wrong', 'error');
          });
      })
      .catch((error) => {
        setLoading(false);
        showSnackbar(error.response.data.error, 'error');
      });
  };

  return (
    <AuthLayout>
      <StyledTypography fontFamily="Poppins" className={classes.title} type="h1" weight="bold">
        Enter code
      </StyledTypography>
      <StyledTypography fontFamily="Poppins" type="h5">
        We have sent a verification code to your email
      </StyledTypography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {loading ? (
          <CircularProgress style={{ margin: '0 auto 20px' }} />
        ) : (
          <>
            <Controller
              as={<StyledTextField fontFamily="Poppins" />}
              placeholder="Enter code"
              name="enterCode"
              type="text"
              className={classes.input}
              autoComplete="none"
              fullWidth
              error={Boolean(errors.enterCode)}
              control={control}
              helperText={errors.enterCode && errors.enterCode.message}
            />
            <StyledButton className={classes.button} type="submit" size="normal" variant="blue" fontFamily="Poppins">
              Enter
            </StyledButton>
          </>
        )}
      </form>
    </AuthLayout>
  );
}

export default EnterCode;

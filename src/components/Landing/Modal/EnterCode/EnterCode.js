import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { SnackbarContext } from 'context/snackbarContext';
import { AuthContext } from 'context/authContext';

import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import useStyles from '../Modal.style';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, enterSignUpCode } from 'services/auth';

function EnterCode({ closeModal }) {
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
            const tutorDetail = data.tutor_detail;
            setLoading(false);
            closeModal();
            if (tutorDetail.qualified) {
              history.push('/tutor/dashboard');
            } else if (tutorDetail.interview_scheduled) {
              history.push('/tutor-application/done');
            } else {
              history.push('/tutor-application/resume');
            }
            showSnackbar('You have successfully logged in', 'success');
          })
          .catch(() => {
            setLoading(false);
            showSnackbar('Something went wrong', 'error');
          });
      })
      .catch((error) => {
        showSnackbar(error.response.data.error, 'error');
      });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {loading ? (
        <CircularProgress style={{ margin: '0 auto 20px' }} />
      ) : (
        <>
          <StyledTypography fontFamily="Poppins" className={classes.formText}>
            We have sent a verification code to your email
          </StyledTypography>
          <Controller
            as={<StyledTextField fontFamily="Poppins" />}
            placeholder="Enter code"
            name="enterCode"
            type="text"
            autoComplete="none"
            fullWidth
            error={Boolean(errors.enterCode)}
            control={control}
            helperText={errors.enterCode && errors.enterCode.message}
          />
          <StyledButton
            className={classes.submitButton}
            type="submit"
            size="normal"
            variant="blue"
            fontFamily="Poppins"
          >
            Enter
          </StyledButton>
        </>
      )}
    </form>
  );
}

export default EnterCode;

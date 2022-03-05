import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import contactSupportValidationSchema from './ContactSupport.validate';
// import { SnackbarContext } from 'context/snackbarContext';
import useStyles from '../Modal.style';
import { AuthContext } from 'context/authContext';
// import { sendEmailToAdmin } from 'services 'services/support';

function ContactSupport({ closeModal }) {
  const classes = useStyles();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(AuthContext);
  // const { // showSnackbar } = useContext(SnackbarContext);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(contactSupportValidationSchema(user)),
    defaultValues: {
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (values) => {
    setSubmitting(true);
    // sendEmailToAdmin({
    //   data: {
    //     email: user ? user.user.email : values.email,
    //     subject: values.subject,
    //     message: values.message,
    //   },
    // })
    //   .then(() => {
    //     // showSnackbar('Support request delivered', 'success');
    //     setSubmitting(false);
    //     closeModal();
    //   })
    //   .catch(() => {
    //     // showSnackbar('Something went wrong', 'error');
    //     setSubmitting(false);
    //     closeModal();
    //   });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {submitting ? (
        <CircularProgress style={{ margin: '0 auto 20px' }} />
      ) : (
        <>
          {!user && (
            <Controller
              as={<StyledTextField fontFamily="Poppins" />}
              placeholder="Email"
              error={Boolean(errors.email)}
              name="email"
              control={control}
              style={{ marginBottom: '10px' }}
              fullWidth
              small
              autoComplete="email"
              helperText={errors.email && errors.email.message}
            />
          )}
          <Controller
            as={<StyledTextField fontFamily="Poppins" />}
            placeholder="Subject"
            name="subject"
            type="text"
            style={{ marginBottom: '10px' }}
            small
            error={Boolean(errors.subject)}
            control={control}
            helperText={errors.subject && errors.subject.message}
            fullWidth
          />
          <Controller
            as={<StyledTextField fontFamily="Poppins" />}
            placeholder="Message"
            style={{ marginBottom: '10px' }}
            name="message"
            multiline
            rows={4}
            type="text"
            small
            error={Boolean(errors.message)}
            control={control}
            helperText={errors.message && errors.message.message}
            fullWidth
          />
          <StyledButton
            className={classes.submitButton}
            type="submit"
            size="normal"
            variant="blue"
            fontFamily="Poppins"
          >
            Submit
          </StyledButton>
        </>
      )}
    </form>
  );
}

export default ContactSupport;

import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { SnackbarContext } from 'context/snackbarContext';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
// import { updateTimesheet } from 'services 'services/admin/timesheets';
import newClientValidationSchema from './RejectModal.validate';
import StyledModal from 'components/Shared/UI/StyledModal';

function RejectModal({ open, onClose, timesheet, fetchTimesheet }) {
  const [loading, setLoading] = useState(false);
  // const { // showSnackbar } = useContext(SnackbarContext);
  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      note: '',
    },
    resolver: yupResolver(newClientValidationSchema),
  });

  const onSubmit = (values) => {
    setLoading(true);
    // updateTimesheet({
    //   id: timesheet.id,
    //   notes: values.note,
    //   timesheet_status: 'rejected',
    // })
    //   .then(() => {
    //     setLoading(false);
    //     // showSnackbar('You have rejected this timesheet', 'success');
    //     fetchTimesheet();
    //     handleCloseModal();
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //     handleCloseModal();
    //     // showSnackbar('Something went wrong', 'error');
    //   });
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <StyledModal header="Reject timesheet" open={open} onClose={onClose} loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<StyledTextField fontFamily="Poppins" />}
          placeholder="Rejection note"
          name="note"
          type="text"
          fullWidth
          multiline
          rows={7}
          style={{ height: 'auto', marginBottom: '15px' }}
          error={Boolean(errors.note)}
          control={control}
          helperText={errors.note && errors.note.message}
        />

        <StyledButton fullWidth type="submit" size="normal" variant="red" fontFamily="Rubik">
          Reject
        </StyledButton>
      </form>
    </StyledModal>
  );
}

export default RejectModal;

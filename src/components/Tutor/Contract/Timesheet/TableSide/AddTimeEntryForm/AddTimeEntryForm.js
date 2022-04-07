import { useContext, useState } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import { createTimeEntry } from 'services/freelancer/timeEntries';
import StyledButton from 'components/Shared/Styled/StyledButton';
import validationSchema from './AddTimeEntryForm.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { SnackbarContext } from 'context/snackbarContext';
import theme from 'theme';

const useStyles = makeStyles(() => ({
  addForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
  },
  noteInput: {
    flex: 1,
    marginRight: '10px',
  },
}));

function AddTimeEntry({ timesheet, setIsOpenEditor, fetchTimesheet }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      customer: '',
      task: '',
      hours: '',
    },
  });
  const onSubmit = (values) => {
    setLoading(true);
    createTimeEntry({
      user_id: timesheet.freelancer.id,
      timesheet_id: timesheet.id,
      customer: values.customer,
      hours: values.hours,
      task: values.task,
    })
      .then(() => {
        fetchTimesheet();
        setLoading(false);
        setIsOpenEditor(false);
      })
      .catch(() => {
        setLoading(false);
        setIsOpenEditor(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  return (
    <form className={classes.addForm} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        className={classes.noteInput}
        as={<StyledTextField />}
        small
        placeholder="Task"
        name="task"
        type="text"
        style={{ width: 'auto' }}
        error={Boolean(errors.task)}
        control={control}
        helperText={errors.task && errors.task.message}
      />
      <Controller
        className={classes.noteInput}
        as={<StyledTextField />}
        small
        placeholder="Customer"
        name="customer"
        type="text"
        style={{ width: 'auto' }}
        error={Boolean(errors.customer)}
        control={control}
        helperText={errors.customer && errors.customer.message}
      />

      <Controller
        as={<StyledTextField />}
        small
        placeholder="Hours"
        name="hours"
        type="number"
        error={Boolean(errors.hours)}
        control={control}
        helperText={errors.hours && errors.hours.message}
        style={{ width: 100, marginRight: 10 }}
      />
      <Box>
        <StyledButton
          disabled={loading}
          type="submit"
          size="small"
          variant="text"
          fontFamily="Poppins"
          style={{ marginRight: 10 }}
          color={theme.palette.skyBlue.main}
        >
          Add
        </StyledButton>
        <StyledButton
          disabled={loading}
          onClick={() => setIsOpenEditor(false)}
          size="small"
          variant="text"
          color={theme.palette.tomatoRed.main}
          fontFamily="Poppins"
        >
          Cancel
        </StyledButton>
      </Box>
    </form>
  );
}

export default AddTimeEntry;

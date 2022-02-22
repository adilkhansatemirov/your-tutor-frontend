import { makeStyles } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledButton from 'components/Shared/Styled/StyledButton';
import validationSchema from './EditTimeEntryForm.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { editTimeEntry } from 'services/freelancer/timeEntries';
import theme from 'theme';
import { useState } from 'react';
import { useContext } from 'react';
import { SnackbarContext } from 'context/snackbarContext';

const useStyles = makeStyles(() => ({
  addForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  noteInput: {
    flex: 1,
    marginRight: '10px',
  },
}));

function EditTimeEntry({ timeEntry, setIsEditing, fetchTimesheet }) {
  const classes = useStyles();
  const { showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      customer: timeEntry.customer ? timeEntry.customer : '',
      task: timeEntry.task,
      hours: timeEntry.hours,
    },
  });

  const onSubmit = (values) => {
    setLoading(true);
    editTimeEntry(timeEntry.id, {
      customer: values.customer,
      task: values.task,
      hours: values.hours,
    })
      .then(() => {
        setLoading(false);
        setIsEditing(false);
        fetchTimesheet();
      })
      .catch(() => {
        setLoading(false);
        setIsEditing(false);
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
        fullWidth
        style={{ width: 'auto' }}
        name="task"
        type="text"
        error={Boolean(errors.task)}
        control={control}
        helperText={errors.task && errors.task.message}
      />
      <Controller
        className={classes.noteInput}
        as={<StyledTextField />}
        small
        placeholder="Customer"
        fullWidth
        style={{ width: 'auto' }}
        name="customer"
        type="text"
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
        style={{ width: '100px', marginRight: 10 }}
        error={Boolean(errors.hours)}
        control={control}
        helperText={errors.hours && errors.hours.message}
      />

      <StyledButton
        disabled={loading}
        type="submit"
        size="small"
        variant="text"
        fontFamily="Poppins"
        style={{ marginRight: 10 }}
        color={theme.palette.skyBlue.main}
      >
        Save
      </StyledButton>
      <StyledButton
        disabled={loading}
        size="small"
        variant="text"
        color={theme.palette.tomatoRed.main}
        fontFamily="Poppins"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </StyledButton>
    </form>
  );
}

export default EditTimeEntry;

import { makeStyles, Box } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledButton from 'components/Shared/Styled/StyledButton';
import validationSchema from './AddTimeEntryForm.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import theme from 'theme';

const useStyles = makeStyles(() => ({
  addForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
    padding: '16px',
  },
  noteInput: {
    flex: 1,
    marginRight: '10px',
  },
}));

function AddTimeEntry({ addTimeEntry, setIsOpenEditor }) {
  const classes = useStyles();

  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      customer: '',
      task: '',
      hours: '',
    },
  });
  const onSubmit = (values) => {
    addTimeEntry(values);
    setIsOpenEditor(false);
  };

  return (
    <form className={classes.addForm} onSubmit={handleSubmit(onSubmit)}>
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

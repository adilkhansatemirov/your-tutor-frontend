import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Table, TableHead, TableBody, Box, makeStyles } from '@material-ui/core';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import StyledButton from 'components/Shared/Styled/StyledButton';
import AddIcon from '@material-ui/icons/Add';
import { SnackbarContext } from 'context/snackbarContext';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import { createIvoice } from 'services/admin/invoices';

import { useContext, useState } from 'react';
import { round } from 'utils/common';
import PageHeader from 'components/Shared/UI/PageHeader';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';

const useStyles = makeStyles((theme) => ({
  newEntryButton: {
    marginTop: '10px',
    backgroundColor: theme.palette.coldWhite,
    border: `1px dashed ${theme.palette.skyBlue.main}`,
    height: '50px',
  },
  newEntryButtonLabel: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: theme.palette.skyBlue.main,
  },
}));

function NewInvoice({ project, initialInvoiceItems }) {
  const { showSnackbar } = useContext(SnackbarContext);
  const classes = useStyles();
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);

  const { control, register, errors, handleSubmit, watch } = useForm({
    defaultValues: {
      items: initialInvoiceItems,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const watchedItems = watch('items');

  const handleAddItem = () => {
    append({ title: '', quantity: 0, price: 0 });
  };

  const handleRemoveItem = (index) => {
    remove(index);
  };

  const handleNavigateBack = () => {
    history.push(`/admin/projects/${project.id}`);
  };

  const handleAction = (action) => {
    handleSubmit(onSubmit)(action);
  };

  const onSubmit = async (values, action) => {
    setSubmitting(true);
    createIvoice({
      invoice: {
        invoice_date: new Date().toISOString(),
        invoice_status: action === 'save' ? 'draft' : 'sent',
        project_id: project.id,
        invoice_items: values.items.map((item) => ({
          time_entry_id: item.time_entry_id === '' ? null : Number(item.time_entry_id),
          price: Number(item.price),
          item: item.title,
          qty: Number(item.quantity),
        })),
      },
    })
      .then(() => {
        setSubmitting(false);
        const completedActionText = action === 'save' ? 'saved' : 'sent';
        showSnackbar(`Invoice has been ${completedActionText}`, 'success');
        handleNavigateBack();
      })
      .catch(() => {
        setSubmitting(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  const invoiceTotal = () => {
    let total = 0;
    watchedItems.forEach((item) => {
      total += round(item.quantity * item.price);
    });
    return round(total);
  };

  const itemTotal = (index) => {
    const watchedItem = watchedItems[index];
    return watchedItem ? round(watchedItem.price * watchedItem.quantity) : 0;
  };

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            New invoice
          </StyledTypography>
          <Box>
            <StyledButton
              size="small"
              textTransform="uppercase"
              disabled={submitting}
              style={{ marginRight: '10px' }}
              onClick={() => handleAction('save')}
              variant="light-blue"
            >
              Save
            </StyledButton>
            <StyledButton
              size="small"
              textTransform="uppercase"
              disabled={submitting}
              onClick={() => handleAction('sent')}
              variant="green"
            >
              Send
            </StyledButton>
          </Box>
        </Box>
      </PageHeader>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Table className={classes.table}>
          <colgroup>
            <col style={{ width: 'auto' }} />
            <col style={{ width: '150px' }} />
            <col style={{ width: '150px' }} />
            <col style={{ width: '70px' }} />
            <col style={{ width: '90px' }} />
          </colgroup>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Hours</StyledTableCell>
              <StyledTableCell>Hourly Rate</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {fields.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>
                  <input
                    ref={register()}
                    defaultValue={item.time_entry_id ? item.time_entry_id : ''}
                    type="hidden"
                    name={`items[${index}].time_entry_id`}
                  />
                  <Controller
                    as={<StyledTextField fontFamily="Poppins" />}
                    placeholder="Title"
                    small
                    name={`items[${index}].title`}
                    type="text"
                    fullWidth
                    defaultValue={item.title}
                    error={Boolean(errors.items && errors.items[index] && errors.items[index].title)}
                    control={control}
                    rules={{ required: 'Title is required' }}
                    helperText={
                      errors.items &&
                      errors.items[index] &&
                      errors.items[index].title &&
                      errors.items[index].title.message
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Controller
                    as={<StyledTextField fontFamily="Poppins" />}
                    placeholder="Qnt"
                    small
                    name={`items[${index}].quantity`}
                    type="number"
                    defaultValue={item.quantity}
                    error={Boolean(errors.items && errors.items[index] && errors.items[index].quantity)}
                    control={control}
                    rules={{ required: 'Quantity is required' }}
                    helperText={
                      errors.items &&
                      errors.items[index] &&
                      errors.items[index].quantity &&
                      errors.items[index].quantity.message
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Controller
                    as={<StyledTextField fontFamily="Poppins" />}
                    placeholder="Price"
                    small
                    name={`items[${index}].price`}
                    type="number"
                    defaultValue={item.price}
                    error={Boolean(errors.items && errors.items[index] && errors.items[index].price)}
                    control={control}
                    rules={{ required: 'Price is required' }}
                    helperText={
                      errors.items &&
                      errors.items[index] &&
                      errors.items[index].price &&
                      errors.items[index].price.message
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTypography fontWeight="bold" fontSize={12} type="h6">
                    <NumberFormat
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={itemTotal(index)}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  </StyledTypography>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledButton
                    onClick={() => handleRemoveItem(index)}
                    style={{ minWidth: '0', width: '100%' }}
                    variant="text"
                    size="small"
                  >
                    <StyledTypography fontSize={12} fontWeight="bold" color="tomatoRed">
                      remove
                    </StyledTypography>
                  </StyledButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <StyledButton
          classes={{ root: classes.newEntryButton, label: classes.newEntryButtonLabel }}
          variant="text"
          fullWidth
          startIcon={<AddIcon />}
          onClick={handleAddItem}
        >
          Add item
        </StyledButton>

        <Box display="flex" justifyContent="flex-end" style={{ marginTop: '20px' }}>
          <StyledTypography fontWeight="medium" fontSize={20} fontFamily="Rubik" type="h3">
            <NumberFormat
              prefix="Total: $"
              decimalScale={2}
              fixedDecimalScale={true}
              value={invoiceTotal()}
              displayType="text"
              thousandSeparator={true}
            />
          </StyledTypography>
        </Box>
      </form>
    </>
  );
}

export default NewInvoice;

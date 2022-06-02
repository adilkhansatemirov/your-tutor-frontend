import { Table, TableHead, TableRow, TableBody, Box, makeStyles } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { Controller } from 'react-hook-form';
import StyledButton from 'components/Shared/Styled/StyledButton';
import AddIcon from '@material-ui/icons/Add';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import { round } from 'utils/common';
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

function TableSide({ invoice, control, errors, register, watch, array }) {
  const { fields, append, remove } = array;
  const classes = useStyles();

  const handleAddItem = () => {
    append({ title: '', quantity: 0, price: 0 });
  };

  const handleRemoveItem = (index) => {
    remove(index);
  };

  const watchedItems = watch('items');

  const itemTotal = (index) => {
    const watchedItem = watchedItems[index];
    return watchedItem ? round(watchedItem.price * watchedItem.quantity) : 0;
  };

  return (
    <>
      <Box display="flex" style={{ width: '70%', marginRight: '26px' }}>
        <form style={{ width: '100%' }}>
          <Table className={classes.table}>
            <colgroup>
              <col style={{ width: '250px' }} />
            </colgroup>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Item</StyledTableCell>
                <StyledTableCell>Hours</StyledTableCell>
                <StyledTableCell>Hourly Rate</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
                {invoice.invoice_status === 'draft' && <StyledTableCell></StyledTableCell>}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {fields.map((item, index) =>
                invoice.invoice_status === 'draft' ? (
                  <TableRow key={item.id}>
                    <StyledTableCell>
                      <input
                        ref={register()}
                        type="hidden"
                        defaultValue={item.invoice_item_id ? item.invoice_item_id : ''}
                        name={`items[${index}].invoice_item_id`}
                      />
                      <input
                        ref={register()}
                        type="hidden"
                        defaultValue={item.time_entry_id ? item.time_entry_id : ''}
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
                        type="text"
                        defaultValue={item.quantity}
                        error={Boolean(errors.items && errors.items[index] && errors.items[index].quantity)}
                        control={control}
                        rules={{ required: 'Qnt is required' }}
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
                        type="text"
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
                          prefix="₸"
                          value={itemTotal(index)}
                          displayType="text"
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
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
                        <StyledTypography fontWeight="bold" fontSize={12} color="tomatoRed">
                          Remove
                        </StyledTypography>
                      </StyledButton>
                    </StyledTableCell>
                  </TableRow>
                ) : (
                  <TableRow key={item.id}>
                    <StyledTableCell>
                      <input
                        ref={register()}
                        type="hidden"
                        defaultValue={item.invoice_item_id ? Number(item.invoice_item_id) : ''}
                        name={`items[${index}].invoice_item_id`}
                      />
                      <input
                        ref={register()}
                        type="hidden"
                        defaultValue={item.time_entry_id ? Number(item.time_entry_id) : ''}
                        name={`items[${index}].time_entry_id`}
                      />
                      <StyledTypography fontWeight="bold" fontSize={14} type="h6">
                        {item.title}
                      </StyledTypography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <input ref={register()} type="hidden" name={`items[${index}].quantity`} />
                      <StyledTypography fontSize={14} type="h6">
                        {item.quantity}
                      </StyledTypography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <input ref={register()} type="hidden" name={`items[${index}].price`} />
                      <StyledTypography fontSize={14} type="h6">
                        <NumberFormat
                          prefix="₸"
                          value={Number(item.price)}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                        />
                      </StyledTypography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <StyledTypography fontWeight="bold" fontSize={14} type="h6">
                        <NumberFormat
                          prefix="₸"
                          value={Number(round(item.price * item.quantity))}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                        />
                      </StyledTypography>
                    </StyledTableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
          {invoice.invoice_status === 'draft' && (
            <StyledButton
              classes={{ root: classes.newEntryButton, label: classes.newEntryButtonLabel }}
              variant="text"
              fullWidth
              startIcon={<AddIcon />}
              onClick={handleAddItem}
            >
              Add item
            </StyledButton>
          )}
        </form>
      </Box>
    </>
  );
}

export default TableSide;

import { useState, useContext } from 'react';
import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import { SnackbarContext } from 'context/snackbarContext';
import { getInvoice } from 'services/admin/invoices';
import TableSide from './TableSide';
import InfoSide from './InfoSide';
import ConfirmationModal from 'components/Shared/Utils/ConfirmationModal';
import { updateIvoice, chargeClient } from 'services/admin/invoices';
import { useFieldArray, useForm } from 'react-hook-form';
import { capitalize, removeUnderscores } from 'utils/common';
import theme from 'theme';
import PageBar from 'components/Shared/UI/PageBar';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';

function InvoicePage({ invoice, fetchInvoice, setInvoice }) {
  const [submitting, setSubmitting] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const history = useHistory();

  const [confirmationModalLoading, setConfirmationModalLoading] = useState(false);
  const [confirmationModalState, setConfirmationModalState] = useState({ isOpen: false, prompt: '', total: '' });

  const fetchInvoiceAndResetForm = () => {
    getInvoice(invoice.id)
      .then((response) => {
        setInvoice(response.data);
        reset({
          items: response.data.invoice_items.map((item) => ({
            invoice_item_id: item.id,
            time_entry_id: item.time_entry_id,
            title: item.item,
            price: item.price,
            quantity: item.qty,
          })),
        });
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        history.push(`/admin/projects/${invoice.project.id}`);
      });
  };

  const handleOpenConfirmationModal = () => {
    setConfirmationModalState({
      isOpen: true,
      prompt: (
        <>
          Are you sure you want to charge the client for{' '}
          <NumberFormat
            prefix="₸"
            value={Number(invoice.amount)}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
          />
          ?
        </>
      ),
      total: invoice.amount,
    });
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalState((state) => ({
      ...state,
      isOpen: false,
    }));
  };

  const handleConfirmUserAction = async () => {
    setConfirmationModalLoading(true);
    chargeClient(invoice.id)
      .then(() => {
        fetchInvoice();
        setConfirmationModalLoading(false);
        handleCloseConfirmationModal();
        showSnackbar('You have charged client by this invoice', 'success');
      })
      .catch(() => {
        fetchInvoice();
        handleCloseConfirmationModal();
        setConfirmationModalLoading(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  const { control, errors, register, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      items: invoice?.invoice_items?.map((item) => ({
        invoice_item_id: item.id,
        time_entry_id: item.time_entry_id,
        title: item.item,
        price: item.price,
        quantity: item.qty,
      })),
    },
  });

  const array = useFieldArray({
    control: control,
    name: 'items',
  });

  const handleAction = (action) => {
    handleSubmit(onSubmit)(action);
  };

  const onSubmit = async (values, action) => {
    setSubmitting(true);
    const itemsToCreate = [];
    const itemsToDelete = [];
    const itemsToUpdate = [];

    const newInvoiceItems = values.items
      ? values.items.map((item) => ({
          id: item.invoice_item_id === '' ? null : Number(item.invoice_item_id),
          time_entry_id: item.time_entry_id === '' ? null : Number(item.time_entry_id),
          price: Number(item.price),
          item: item.title,
          qty: Number(item.quantity),
        }))
      : [];

    newInvoiceItems.forEach((item) => {
      if (item.id === null) itemsToCreate.push(item);
      else itemsToUpdate.push(item);
    });

    invoice.invoice_items.forEach((item) => {
      const oldItem = newInvoiceItems.find((newItem) => newItem.id === item.id);
      if (!oldItem) itemsToDelete.push(item);
    });

    updateIvoice(invoice.id, {
      invoice: {
        invoice_status: action === 'save' ? 'draft' : 'sent',
        items_to_create: itemsToCreate,
        items_to_update: itemsToUpdate,
        items_to_delete: itemsToDelete,
      },
    })
      .then(() => {
        const completedActionText = action === 'save' ? 'saved' : 'sent';
        showSnackbar(`Invoice has been ${completedActionText}`, 'success');
        fetchInvoiceAndResetForm();
        setSubmitting(false);
      })
      .catch(() => {
        fetchInvoice();
        setSubmitting(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  const renderInvoiceActions = (status) => {
    if (status === 'draft') {
      return (
        <>
          <StyledButton
            disabled={submitting}
            style={{ marginRight: '10px' }}
            onClick={() => handleAction('save')}
            size="small"
            variant="light-blue"
            textTransform="uppercase"
          >
            Save
          </StyledButton>
          <StyledButton
            size="small"
            variant="green"
            textTransform="uppercase"
            disabled={submitting}
            onClick={() => handleAction('send')}
          >
            Send
          </StyledButton>
        </>
      );
    }

    if (status === 'sent' || status === 'error') {
      return (
        <StyledButton
          disabled={submitting}
          size="small"
          textTransform="uppercase"
          onClick={() => handleOpenConfirmationModal()}
          variant="green"
        >
          Charge Client
        </StyledButton>
      );
    }
  };

  return (
    <>
      {invoice.invoice_status === 'paid' && (
        <PageBar
          text={capitalize(removeUnderscores(invoice.invoice_status))}
          barColor={theme.palette.green.main}
          textColor="white"
        />
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: invoice.invoice_status === 'paid' ? '45px' : '25px' }}
      >
        <StyledTypography fontWeight="medium" fontSize="22px" fontFamily="Rubik">
          Invoice
        </StyledTypography>
        <Box>{renderInvoiceActions(invoice.invoice_status)}</Box>
      </Box>

      <Box display="flex" style={{ marginTop: '35px' }}>
        <TableSide
          invoice={invoice}
          control={control}
          errors={errors}
          register={register}
          watch={watch}
          array={array}
          setInvoice={setInvoice}
        />
        <InfoSide invoice={invoice} />
      </Box>

      <ConfirmationModal
        isOpen={confirmationModalState.isOpen}
        handleClose={handleCloseConfirmationModal}
        loading={confirmationModalLoading}
        promtText={confirmationModalState.prompt}
        handleConfirmAction={handleConfirmUserAction}
        handleCancelAction={handleCloseConfirmationModal}
      />
    </>
  );
}

export default InvoicePage;

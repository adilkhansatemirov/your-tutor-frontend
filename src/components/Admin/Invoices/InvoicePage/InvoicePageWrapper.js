import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InvoicePage from 'components/Admin/Invoices/InvoicePage/InvoicePage';
import { getInvoice } from 'services/admin/invoices';
import { SnackbarContext } from 'context/snackbarContext';
import PageLoader from 'components/Shared/Utils/PageLoader';

function PageInvoiceWrapper() {
  const { showSnackbar } = useContext(SnackbarContext);

  const { invoiceId } = useParams();

  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetchInvoice();
    // eslint-disable-next-line
  }, []);

  const fetchInvoice = () => {
    getInvoice(invoiceId)
      .then((response) => {
        setInvoice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status !== 404) {
          showSnackbar('Something went wrong', 'error');
        }
      });
  };

  return loading ? (
    <PageLoader />
  ) : (
    <InvoicePage invoice={invoice} fetchInvoice={fetchInvoice} setInvoice={setInvoice} />
  );
}

export default PageInvoiceWrapper;

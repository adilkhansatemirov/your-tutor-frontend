import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import TableSide from './TableSide';
import InfoSide from './InfoSide';
import { capitalize, removeUnderscores } from 'utils/common';
import theme from 'theme';
import PageBar from 'components/Shared/UI/PageBar';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoice } from 'services/client/invoices';
import PageLoader from 'components/Shared/Utils/PageLoader';
import { SnackbarContext } from 'context/snackbarContext';

function InvoicePage() {
  const { showSnackbar } = useContext(SnackbarContext);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const { invoiceId } = useParams();

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
        // if (error.response.status !== 404) {
        //   showSnackbar('Something went wrong', 'error');
        //   setLoading(false);
        // }
      });
  };

  return loading ? (
    <PageLoader />
  ) : (
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
          {invoice.project.title}
        </StyledTypography>
      </Box>
      <Box display="flex" style={{ marginTop: '35px' }}>
        <TableSide invoice={invoice} />
        <InfoSide invoice={invoice} />
      </Box>
    </>
  );
}

export default InvoicePage;

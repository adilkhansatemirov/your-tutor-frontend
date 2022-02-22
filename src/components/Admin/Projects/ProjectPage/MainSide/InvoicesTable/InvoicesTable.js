import { Table, TableBody, TableHead } from '@material-ui/core';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import Status from 'components/Shared/UI/Status/Status';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { capitalize, removeUnderscores } from 'utils/common';

function InvoicesTable({ project }) {
  const getColor = (invoice) => {
    switch (invoice.invoice_status) {
      case 'sent':
        return 'orange';
      case 'draft':
        return 'orange';
      case 'paid':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'red';
    }
  };

  const getComplete = (invoice) => {
    switch (invoice.invoice_status) {
      case 'draft':
        return false;
      case 'error':
        return true;
      case 'sent':
        return true;
      case 'paid':
        return true;
      default:
        return false;
    }
  };

  const invoiceStatus = (invoice) => ({
    color: getColor(invoice),
    text: capitalize(removeUnderscores(invoice.invoice_status)),
    complete: getComplete(invoice),
  });

  return (
    <Table>
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '30%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>Invoice Date</StyledTableCell>
          <StyledTableCell>Invoice Amount</StyledTableCell>
          <StyledTableCell>Status</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {project.invoices.map((invoice) => (
          <StyledTableRow key={invoice.id}>
            <StyledTableCell>
              <Link to={`/admin/invoices/${invoice.id}`} style={{ textDecoration: 'none' }}>
                <StyledTypography fontWeight="bold" color="skyBlue">
                  {moment(invoice.invoice_date).format('MMMM DD, YYYY')}
                </StyledTypography>
              </Link>
            </StyledTableCell>
            <StyledTableCell>
              <StyledTypography fontSize="12px">
                <NumberFormat
                  prefix="$"
                  value={Number(invoice.invoice_amount)}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  displayType="text"
                  thousandSeparator={true}
                />
              </StyledTypography>
            </StyledTableCell>
            <StyledTableCell>
              <Status
                complete={invoiceStatus(invoice).complete}
                color={invoiceStatus(invoice).color}
                text={invoiceStatus(invoice).text}
              />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default InvoicesTable;

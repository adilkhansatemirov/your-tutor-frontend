import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import Status from 'components/Shared/UI/Status/Status';
import moment from 'moment';
import { capitalize } from 'utils/common';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function InvoiceListItem({ invoice }) {
  const getColor = () => {
    switch (invoice.invoice_status) {
      case 'draft':
        return 'orange';
      case 'sent':
        return 'orange';
      case 'paid':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'red';
    }
  };

  const getComplete = () => {
    switch (invoice.invoice_status) {
      case 'draft':
        return false;
      case 'sent':
        return true;
      case 'paid':
        return true;
      case 'error':
        return true;
      default:
        return false;
    }
  };

  const invoiceStatus = {
    color: getColor(),
    text: capitalize(invoice.invoice_status),
    complete: getComplete(),
  };

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Link to={`/admin/invoices/${invoice.id}`} style={{ textDecoration: 'none' }}>
          <StyledTypography color="skyBlue" fontSize={12} fontWeight="bold">
            {moment(invoice.invoice_date).format('MMMM DD, YYYY')}
          </StyledTypography>
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12} fontWeight="bold">
          {`${invoice.project.student_detail.user.first_name} ${invoice.project.student_detail.user.last_name}`}
        </StyledTypography>
        <StyledTypography fontSize={12}>{invoice.project.student_detail.user.email}</StyledTypography>
        <StyledTypography fontSize={12}>{invoice.project.student_detail.company_name}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        {invoice.project.freelancer_detail ? (
          <>
            <StyledTypography fontSize={12} fontWeight="bold">
              {`${invoice.project.freelancer_detail.user.first_name} ${invoice.project.freelancer_detail.user.last_name}`}
            </StyledTypography>
            <StyledTypography fontSize={12}>{invoice.project.freelancer_detail.user.email}</StyledTypography>
          </>
        ) : (
          <StyledTypography fontSize={12}>Deleted user</StyledTypography>
        )}
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12} fontWeight="bold">
          {invoice.project.title}
        </StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>
          <NumberFormat
            prefix="$"
            value={Number(invoice.amount)}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
          />
        </StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <Status complete={invoiceStatus.complete} color={invoiceStatus.color} text={invoiceStatus.text} />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default InvoiceListItem;

import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import Status from 'components/Shared/UI/Status/Status';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function InvoiceListItem({ invoice }) {
  const invoiceStatus = {
    color: invoice.invoice_status === 'paid' ? 'green' : 'orange',
    text: invoice.invoice_status === 'paid' ? 'Paid' : 'Open',
    complete: true,
  };

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Link to={`/client/invoices/${invoice.id}`} style={{ textDecoration: 'none' }}>
          <StyledTypography color="skyBlue" fontSize={12} fontWeight="bold">
            {invoice.project.title}
          </StyledTypography>
        </Link>
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
        <NumberFormat
          prefix="$"
          value={Number(invoice.amount)}
          decimalScale={2}
          fixedDecimalScale={true}
          displayType="text"
          thousandSeparator={true}
        />
      </StyledTableCell>
      <StyledTableCell>
        <Status complete={invoiceStatus.complete} color={invoiceStatus.color} text={invoiceStatus.text} />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default InvoiceListItem;

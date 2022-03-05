import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import moment from 'moment';
import { capitalize } from 'utils/common';
import NumberFormat from 'react-number-format';

function PaymentsListItem({ payment }) {
  return (
    <StyledTableRow>
      <StyledTableCell>
        <StyledTypography
          color={payment.payment_type === 'payment' ? 'tomatoRed' : 'green'}
          fontSize={12}
          fontWeight="bold"
        >
          {capitalize(payment.payment_type)}
        </StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>
          <NumberFormat
            prefix="$"
            value={Number(payment.net_amount)}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
          />
        </StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>
          <NumberFormat
            prefix="$"
            value={Number(payment.full_amount)}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
          />
        </StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>
          <NumberFormat
            prefix="$"
            value={Number(payment.stripe_fee)}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
          />
        </StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>{moment(payment.created_at).format('MMMM DD, YYYY')}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>{payment.description}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontWeight="bold" fontSize={12} color={payment.status === 'completed' ? 'green' : 'orange'}>
          {capitalize(payment.status)}
        </StyledTypography>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default PaymentsListItem;

import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import { capitalize, removeUnderscores } from 'utils/common';
import moment from 'moment';
import NumberFormat from 'react-number-format';

function InfoSide({ invoice }) {

  return (
    <Box style={{ width: '30%' }}>
      <InfoBox>
        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Invoice
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
          {moment(invoice.invoice_date).format('MMMM DD, YYYY')}
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={20} fontWeight="medium">
          <NumberFormat
            prefix="$"
            value={Number(invoice.amount)}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
            suffix=" Total"
          />
        </StyledTypography>
        <StyledTypography
          style={{ marginBottom: '5px' }}
          fontFamily="Rubik"
          fontSize={20}
          color={invoice.invoice_status === 'paid' ? 'green' : 'orange'}
          fontWeight="bold"
        >
          {invoice.invoice_status === 'paid' ? 'Paid' : 'Open'}
        </StyledTypography>
      </InfoBox>

      <InfoBox>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Freelancer
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={14} fontWeight="bold">
          {invoice.project.freelancer_detail.user.first_name} {invoice.project.freelancer_detail.user.last_name}
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
          {invoice.project.freelancer_detail.user.email}
        </StyledTypography>
      </InfoBox>

      <InfoBox>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Project
        </StyledTypography>

        <StyledTypography style={{ marginBottom: '10px' }} fontFamily="Roboto" fontSize={14} fontWeight="bold">
          {invoice.project.title}
        </StyledTypography>

        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={20} fontWeight="medium">
          <NumberFormat
            prefix="$"
            value={Number(invoice.project.client_payment_amount)}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
            suffix={invoice.project.client_type_of_billing === 'hourly_rate' ? '/hr' : ''}
          />
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Roboto" fontSize={12}>
          {capitalize(removeUnderscores(invoice.project.client_type_of_billing))}
        </StyledTypography>
        <StyledTypography fontFamily="Roboto" fontSize={12}>
          {capitalize(removeUnderscores(invoice.project.invoicing_schedule))}
        </StyledTypography>
      </InfoBox>
    </Box>
  );
}

export default InfoSide;

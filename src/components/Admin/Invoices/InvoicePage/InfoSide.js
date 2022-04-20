import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import { capitalize, removeUnderscores } from 'utils/common';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function InfoSide({ invoice }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'orange';
      case 'sent':
        return 'orange';
      case 'paid':
        return 'green';
      case 'error':
        return 'tomatoRed';
      default:
        return 'tomatoRed';
    }
  };

  const invoiceDetails = {
    date: invoice.invoice_date,
    status: capitalize(invoice.invoice_status),
    statusColor: getStatusColor(invoice.invoice_status),
    errorMessage: invoice.error_message,
  };

  const freelancer = {
    fullname: invoice.project.freelancer_detail
      ? `${invoice.project.freelancer_detail.user.first_name} ${invoice.project.freelancer_detail.user.last_name}`
      : 'Deleted user',
    email: invoice.project.freelancer_detail ? invoice.project.freelancer_detail.user.email : '',
  };

  const project = {
    title: invoice.project.title,
    clientFullname: `${invoice.project.client_detail.user.first_name} ${invoice.project.client_detail.user.last_name}`,
    clientEmail: invoice.project.client_detail.user.email,
    companyName: invoice.project.client_detail.company_name,
    typeOfBilling: capitalize(removeUnderscores(invoice.project.client_type_of_billing)),
    invoicingSchedule: capitalize(removeUnderscores(invoice.project.invoicing_schedule)),
  };

  return (
    <Box style={{ width: '30%' }}>
      {invoice.invoice_status === 'error' && (
        <InfoBox red>
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
            Error
          </StyledTypography>
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
            {invoiceDetails.errorMessage}
          </StyledTypography>
        </InfoBox>
      )}
      <InfoBox>
        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Invoice
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
          {moment(invoiceDetails.date).format('MMMM DD, YYYY')}
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
          color={invoiceDetails.statusColor}
          fontWeight="bold"
        >
          {invoiceDetails.status}
        </StyledTypography>
      </InfoBox>

      <InfoBox>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Freelancer
        </StyledTypography>
        {invoice.project.freelancer_detail ? (
          <>
            <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={14} fontWeight="bold">
              {freelancer.fullname}
            </StyledTypography>
            <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
              {freelancer.email}
            </StyledTypography>
          </>
        ) : (
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
            {freelancer.fullname}
          </StyledTypography>
        )}

        <StyledTypography
          style={{ marginTop: '5px', marginBottom: '5px' }}
          fontFamily="Rubik"
          fontSize={20}
          fontWeight="medium"
        >
          <NumberFormat
            prefix="$"
            value={Number(invoice.project.freelancer_payment_amount)}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
            suffix={invoice.project.client_type_of_billing === 'hourly_rate' ? '/hr' : ''}
          />
        </StyledTypography>
      </InfoBox>

      <InfoBox>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Project
        </StyledTypography>
        <Link to={`/admin/projects/${invoice.project.id}`} style={{ textDecoration: 'none' }}>
          <StyledTypography
            style={{ marginBottom: '10px' }}
            fontFamily="Roboto"
            fontSize={14}
            color="skyBlue"
            fontWeight="bold"
          >
            {project.title}
          </StyledTypography>
        </Link>
        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Roboto" fontSize={14} fontWeight="bold">
          {project.clientFullname}
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Roboto" fontSize={14}>
          {project.clientEmail}
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '10px' }} fontFamily="Roboto" fontSize={14}>
          {project.companyName}
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
          {project.typeOfBilling}
        </StyledTypography>
        <StyledTypography fontFamily="Roboto" fontSize={12}>
          {project.invoicingSchedule}
        </StyledTypography>
      </InfoBox>
    </Box>
  );
}

export default InfoSide;

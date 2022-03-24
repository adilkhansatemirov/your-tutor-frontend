import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function InfoSide({ timesheet }) {
  const getStatusText = () => {
    switch (timesheet.timesheet_status) {
      case 'submitted':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'paid':
        return 'Paid';
      case 'rejected':
        return 'Rejected';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (timesheet.timesheet_status) {
      case 'submitted':
        return 'orange';
      case 'approved':
        return 'green';
      case 'paid':
        return 'green';
      case 'rejected':
        return 'tomatoRed';
      default:
        return 'tomatoRed';
    }
  };

  const timesheetDetails = {
    date: timesheet.timesheet_date,
    status: getStatusText(),
    statusColor: getStatusColor(),
  };

  const project = {
    title: timesheet.project.title,
    clientFullname: `${timesheet.project.client_detail.user.first_name} ${timesheet.project.client_detail.user.last_name}`,
    clientEmail: timesheet.project.client_detail.user.email,
    companyName: timesheet.project.client_detail.company_name,
  };

  return (
    <Box style={{ width: '30%' }}>
      {timesheet.timesheet_status === 'rejected' && (
        <InfoBox red>
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
            Rejected
          </StyledTypography>
          <StyledTypography fontFamily="Roboto" fontSize={12}>
            {timesheet.notes}
          </StyledTypography>
        </InfoBox>
      )}
      <InfoBox>
        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Timesheet
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
          Week of {moment(timesheetDetails.date).format('MMMM DD, YYYY')}
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={20} fontWeight="medium">
          <NumberFormat
            prefix="$"
            value={Number(timesheet.amount)}
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
          color={timesheetDetails.statusColor}
          fontWeight="bold"
        >
          {timesheetDetails.status}
        </StyledTypography>
      </InfoBox>

      <InfoBox>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Freelancer
        </StyledTypography>
        {timesheet.freelancer ? (
          <>
            <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={14} fontWeight="bold">
              {timesheet.freelancer.first_name} {timesheet.freelancer.last_name}
            </StyledTypography>
            <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
              {timesheet.freelancer.email}
            </StyledTypography>
          </>
        ) : (
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
            Deleted User
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
            value={Number(timesheet.project.tutor_payment_amount)}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            thousandSeparator={true}
            suffix={timesheet.project.student_type_of_billing === 'hourly_rate' ? '/hr' : ''}
          />
        </StyledTypography>
      </InfoBox>

      <InfoBox>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Project
        </StyledTypography>
        <Link to={`/admin/projects/${timesheet.project.id}`} style={{ textDecoration: 'none' }}>
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
      </InfoBox>
    </Box>
  );
}

export default InfoSide;

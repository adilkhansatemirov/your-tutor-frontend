import { Box, capitalize } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function InfoSide({ timesheet }) {
  const getStatusColor = () => {
    switch (timesheet.timesheet_status) {
      case 'edited':
        return 'orange';
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
          Week of {moment(timesheet.timesheet_date).format('MMMM DD, YYYY')}
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
          color={getStatusColor()}
          fontWeight="bold"
        >
          {timesheet.timesheet_status === 'edited' ? 'Draft' : capitalize(timesheet.timesheet_status)}
        </StyledTypography>
      </InfoBox>

      <InfoBox>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Company
        </StyledTypography>
        <Link to={`/tutor/contracts/${timesheet.project.id}`} style={{ textDecoration: 'none' }}>
          <StyledTypography
            style={{ marginBottom: '10px' }}
            fontFamily="Roboto"
            fontSize={14}
            color="skyBlue"
            fontWeight="bold"
          >
            {timesheet.project.title}
          </StyledTypography>
        </Link>
        <StyledTypography style={{ marginBottom: '10px' }} fontFamily="Roboto" fontSize={14}>
          {timesheet.project.student_detail.company_name}
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Roboto" fontSize={14} fontWeight="bold">
          {timesheet.project.student_detail.user.first_name} {timesheet.project.student_detail.user.last_name}
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Roboto" fontSize={14}>
          {timesheet.project.student_detail.user.email}
        </StyledTypography>
      </InfoBox>
    </Box>
  );
}

export default InfoSide;

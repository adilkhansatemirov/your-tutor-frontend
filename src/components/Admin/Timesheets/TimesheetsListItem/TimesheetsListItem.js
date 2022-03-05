import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import Status from 'components/Shared/UI/Status/Status';
import moment from 'moment';
import { Link } from 'react-router-dom';

function TimesheetsListItem({ timesheet }) {
  const getText = () => {
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

  const getColor = () => {
    switch (timesheet.timesheet_status) {
      case 'submitted':
        return 'orange';
      case 'approved':
        return 'green';
      case 'paid':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'red';
    }
  };

  const getComplete = () => {
    switch (timesheet.timesheet_status) {
      case 'submitted':
        return false;
      case 'approved':
        return false;
      case 'paid':
        return true;
      case 'rejected':
        return true;
      default:
        return false;
    }
  };

  const timesheetStatus = {
    color: getColor(),
    text: getText(),
    complete: getComplete(),
  };

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Link to={`/admin/timesheets/${timesheet.id}`} style={{ textDecoration: 'none' }}>
          <StyledTypography color="skyBlue" fontSize={12} fontWeight="bold">
            {moment(timesheet.timesheet_date).format('MMMM DD, YYYY')}
          </StyledTypography>
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        {timesheet.freelancer ? (
          <>
            <StyledTypography fontSize={12} fontWeight="bold">
              {`${timesheet.freelancer.first_name} ${timesheet.freelancer.last_name}`}
            </StyledTypography>
            <StyledTypography fontSize={12}>{timesheet.freelancer.email}</StyledTypography>
          </>
        ) : (
          <StyledTypography fontSize={12}>Deleted user</StyledTypography>
        )}
      </StyledTableCell>

      <StyledTableCell>
        <StyledTypography fontSize={12} fontWeight="bold">
          {`${timesheet.project.client_detail.user.first_name} ${timesheet.project.client_detail.user.last_name}`}
        </StyledTypography>
        <StyledTypography fontSize={12}>{timesheet.project.client_detail.user.email}</StyledTypography>
        <StyledTypography fontSize={12}>{timesheet.project.client_detail.company_name}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12} fontWeight="bold">
          {timesheet.project.title}
        </StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>{timesheet.hours} hours</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <Status complete={timesheetStatus.complete} color={timesheetStatus.color} text={timesheetStatus.text} />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default TimesheetsListItem;

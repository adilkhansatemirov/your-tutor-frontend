import { capitalize, Table, TableBody, TableHead } from '@material-ui/core';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import Status from 'components/Shared/UI/Status/Status';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { removeUnderscores } from 'utils/common';

function TimesheetsTable({ project }) {
  const getColor = (timesheet) => {
    switch (timesheet.timesheet_status) {
      case 'approved':
        return 'green';
      case 'submitted':
        return 'orange';
      case 'paid':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'red';
    }
  };

  const getComplete = (timesheet) => {
    switch (timesheet.timesheet_status) {
      case 'submitted':
        return false;
      case 'approved':
        return false;
      case 'rejected':
        return true;
      case 'paid':
        return true;
      default:
        return false;
    }
  };

  const timesheetStatus = (timesheet) => ({
    color: getColor(timesheet),
    text: capitalize(removeUnderscores(timesheet.timesheet_status)),
    complete: getComplete(timesheet),
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
          <StyledTableCell>Timesheet Week</StyledTableCell>
          <StyledTableCell>Tutor</StyledTableCell>
          <StyledTableCell>Hours</StyledTableCell>
          <StyledTableCell>Status</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {project.timesheets.map((timesheet) => (
          <StyledTableRow key={timesheet.id}>
            <StyledTableCell>
              <Link to={`/admin/timesheets/${timesheet.id}`} style={{ textDecoration: 'none' }}>
                <StyledTypography fontWeight="bold" color="skyBlue">
                  {moment(timesheet.timesheet_date).format('MMMM DD, YYYY')}
                </StyledTypography>
              </Link>
            </StyledTableCell>
            <StyledTableCell>
              {timesheet.tutor ? (
                <>
                  <StyledTypography fontWeight="bold">
                    {timesheet.tutor.first_name} {timesheet.tutor.last_name}
                  </StyledTypography>
                  <StyledTypography fontSize="12px">{timesheet.tutor.email}</StyledTypography>
                </>
              ) : (
                <StyledTypography fontWeight="bold">Deleted user</StyledTypography>
              )}
            </StyledTableCell>
            <StyledTableCell>
              <StyledTypography fontSize="12px">{timesheet.hours} hours</StyledTypography>
            </StyledTableCell>
            <StyledTableCell>
              <Status
                complete={timesheetStatus(timesheet).complete}
                color={timesheetStatus(timesheet).color}
                text={timesheetStatus(timesheet).text}
              />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TimesheetsTable;

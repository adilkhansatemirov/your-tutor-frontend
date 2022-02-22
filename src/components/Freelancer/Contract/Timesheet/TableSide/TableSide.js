import { useState } from 'react';
import { Table, TableHead, TableBody, Box } from '@material-ui/core';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import AddTimeEntryForm from './AddTimeEntryForm/AddTimeEntryForm';
import StyledButton from 'components/Shared/Styled/StyledButton';
import AddIcon from '@material-ui/icons/Add';
import { timesheetStatuses } from 'constants/constants';
import TimeEntryItem from './TimeEntryItem';

function TableSide({ timesheet, fetchTimesheet }) {
  const [isOpenEditor, setIsOpenEditor] = useState(false);

  const handleAddTimeEntry = () => {
    setIsOpenEditor(true);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" style={{ width: '70%', marginRight: '26px' }}>
        <Table>
          <colgroup>
            <col style={{ width: '250px' }} />
          </colgroup>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Task</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Hours</StyledTableCell>
              {timesheet.timesheet_status !== 'submitted' && <StyledTableCell />}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {timesheet.time_entries.map((timeEntry) => (
              <TimeEntryItem
                timesheet={timesheet}
                key={timeEntry.id}
                timeEntry={timeEntry}
                fetchTimesheet={fetchTimesheet}
              />
            ))}
          </TableBody>
        </Table>

        {(timesheet.timesheet_status === timesheetStatuses.edited ||
          timesheet.timesheet_status === timesheetStatuses.rejected) &&
          (isOpenEditor ? (
            <AddTimeEntryForm timesheet={timesheet} setIsOpenEditor={setIsOpenEditor} fetchTimesheet={fetchTimesheet} />
          ) : (
            <StyledButton
              variant="dashed-light-blue"
              fullWidth
              style={{ marginTop: '10px' }}
              startIcon={<AddIcon />}
              onClick={handleAddTimeEntry}
            >
              New entry
            </StyledButton>
          ))}
      </Box>
    </>
  );
}

export default TableSide;

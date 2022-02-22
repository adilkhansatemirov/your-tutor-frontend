import { Table, TableHead, TableBody, Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';

function TableSide({ timesheet }) {
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
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {timesheet.time_entries.map((timeEntry) => (
              <StyledTableRow key={timeEntry.id}>
                <StyledTableCell>
                  <StyledTypography fontWeight="bold" fontSize={12} type="h6">
                    {timeEntry.task}
                  </StyledTypography>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTypography fontSize={12} type="h6">
                    {timeEntry.customer ? (
                      timeEntry.customer
                    ) : (
                      <Box component="span" style={{ opacity: 0.5 }}>
                        (none)
                      </Box>
                    )}
                  </StyledTypography>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTypography fontSize={12} type="h6">
                    {timeEntry.hours} hours
                  </StyledTypography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default TableSide;

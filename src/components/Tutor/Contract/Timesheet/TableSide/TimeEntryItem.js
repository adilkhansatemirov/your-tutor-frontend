import { useState } from 'react';
import { Box } from '@material-ui/core';
import ConfirmationModal from 'components/Shared/Utils/ConfirmationModal';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import EditTimeEntryForm from './EditTimeEntryForm/EditTimeEntryForm';
import theme from 'theme';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import { deleteTimeEntry } from 'services/freelancer/timeEntries';
import { useContext } from 'react';
import { SnackbarContext } from 'context/snackbarContext';

function TimeEntryItem({ timesheet, timeEntry, fetchTimesheet }) {
  const { showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(false);
  const [сonfirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteTimeEntry = () => {
    setLoading(true);
    deleteTimeEntry(timeEntry.id)
      .then(() => {
        showSnackbar('Time entry deleted', 'success');
        setLoading(false);
        setConfirmationModalIsOpen(false);
        fetchTimesheet();
      })
      .catch(() => {
        setLoading(false);
        setConfirmationModalIsOpen(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  return (
    <>
      <StyledTableRow>
        {isEditing ? (
          <StyledTableCell colSpan={4}>
            <EditTimeEntryForm fetchTimesheet={fetchTimesheet} timeEntry={timeEntry} setIsEditing={setIsEditing} />
          </StyledTableCell>
        ) : (
          <>
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
            {(timesheet.timesheet_status === 'edited' || timesheet.timesheet_status === 'rejected') && (
              <StyledTableCell align="right">
                <StyledButton
                  disabled={loading}
                  size="small"
                  variant="text"
                  fontFamily="Poppins"
                  style={{ marginRight: 10 }}
                  color={theme.palette.skyBlue.main}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </StyledButton>
                <StyledButton
                  disabled={loading}
                  size="small"
                  variant="text"
                  color={theme.palette.tomatoRed.main}
                  fontFamily="Poppins"
                  onClick={() => setConfirmationModalIsOpen(true)}
                >
                  Delete
                </StyledButton>
              </StyledTableCell>
            )}
          </>
        )}
      </StyledTableRow>
      <ConfirmationModal
        promtText="Are you sure you want to delete this time entry?"
        isOpen={сonfirmationModalIsOpen}
        handleClose={() => setConfirmationModalIsOpen(false)}
        handleConfirmAction={handleDeleteTimeEntry}
        handleCancelAction={() => setConfirmationModalIsOpen(false)}
      />
    </>
  );
}

export default TimeEntryItem;

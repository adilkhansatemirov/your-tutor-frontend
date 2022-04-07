import { useState } from 'react';
import { TableRow, Box, makeStyles } from '@material-ui/core';
import ConfirmationModal from 'components/Shared/Utils/ConfirmationModal';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import EditTimeEntryForm from './EditTimeEntryForm/EditTimeEntryForm';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import theme from 'theme';

const useStyles = makeStyles(() => ({
  tableRow: {
    '&:nth-of-type(even)': {
      backgroundColor: '#F6F7F9',
    },
  },
  timesheetActionButton: {
    minWidth: '56px',
    marginLeft: '8px',
  },
  bold: {
    fontWeight: 'bold',
  },
}));

function TimeEntryItem({ timeEntry, index, editTimeEntry, deleteTimeEntry }) {
  const classes = useStyles();
  const [сonfirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteTimeEntry = () => {
    deleteTimeEntry(index);
    setConfirmationModalIsOpen(false);
  };

  return (
    <>
      <TableRow key={timeEntry.id} className={classes.tableRow}>
        {isEditing ? (
          <StyledTableCell colSpan={4}>
            <EditTimeEntryForm
              index={index}
              editTimeEntry={editTimeEntry}
              timeEntry={timeEntry}
              setIsEditing={setIsEditing}
            />
          </StyledTableCell>
        ) : (
          <>
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
              <StyledTypography fontWeight="bold" fontSize={12} type="h6">
                {timeEntry.task}
              </StyledTypography>
            </StyledTableCell>
            <StyledTableCell>
              <StyledTypography fontSize={12} type="h6">
                {timeEntry.hours} hours
              </StyledTypography>
            </StyledTableCell>

            <StyledTableCell align="right">
              <StyledButton
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
                size="small"
                variant="text"
                color={theme.palette.tomatoRed.main}
                fontFamily="Poppins"
                onClick={() => setConfirmationModalIsOpen(true)}
              >
                Delete
              </StyledButton>
            </StyledTableCell>
          </>
        )}
      </TableRow>
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

import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Box, Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import TimeEntryItem from './TimeEntryItem';
import StyledButton from 'components/Shared/Styled/StyledButton';
import AddTimeEntryForm from './AddTimeEntryForm/AddTimeEntryForm';
import AddIcon from '@material-ui/icons/Add';
import { AuthContext } from 'context/authContext';
import { createTimesheet } from 'services/freelancer/timesheets';
import { SnackbarContext } from 'context/snackbarContext';
import EnterPayoutModal from '../../ContractPage/EnterPayoutModal';
import { getProject } from 'services/freelancer/projects';
import PageHeader from 'components/Shared/UI/PageHeader';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

function NewTimesheet() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const { contractId } = useParams();
  const [loading, setLoading] = useState(false);
  const [isEnterPayoutModalOpen, setIsEnterPayoutModalOpen] = useState(false);

  const [project, setProject] = useState([]);

  const fetchProject = () => {
    getProject(contractId)
      .then((response) => {
        setLoading(false);
        setProject(response.data);
      })
      .catch((error) => {
        if (error.response.status !== 404) {
          showSnackbar('Something went wrong', 'error');
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, []);

  const [timeEntries, setTimeEntries] = useState([]);

  const addTimeEntry = (values) => {
    let list = [...timeEntries, values];
    setTimeEntries(list);
  };

  const editTimeEntry = (index, values) => {
    let list = timeEntries.map((timeEntry, timeEntryIndex) => {
      return timeEntryIndex === index ? values : timeEntry;
    });
    setTimeEntries(list);
  };

  const deleteTimeEntry = (index) => {
    let list = timeEntries.filter((_, timeEntryIndex) => timeEntryIndex !== index);
    setTimeEntries(list);
  };

  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [date, setDate] = useState(moment());

  const isTimesheetExistOnWeek = (date) => {
    for (let i = 0; i < project.timesheets.length; i++) {
      if (moment(project.timesheets[i].timesheet_date).isSame(date, 'day')) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (project.timesheets) {
      let steps = 0;
      let saturday = moment()
        .subtract(7 * steps, 'days')
        .endOf('week');
      while (isTimesheetExistOnWeek(saturday)) {
        steps++;
        saturday = moment()
          .subtract(7 * steps, 'days')
          .endOf('week');
      }
      setDate(saturday);
    }
    // eslint-disable-next-line
  }, [project]);

  const handleAddTimeEntry = () => {
    setIsOpenEditor(true);
  };

  const handleNavigateBack = () => {
    history.push(`/tutor/contracts/${project.id}`);
  };

  const handleAction = (action) => {
    setLoading(true);
    if (user.freelancer_detail.connected_account_id) {
      createTimesheet({
        timesheet: {
          project_id: project.id,
          freelancer_id: user.user.id,
          timesheet_status: action === 'save' ? 'edited' : 'submitted',
          timesheet_date: date.toISOString(),
          time_entries: timeEntries,
        },
      })
        .then(() => {
          setLoading(false);
          showSnackbar(`Timesheet ${action === 'save' ? 'created' : 'submitted'}`, 'success');
          handleNavigateBack();
        })
        .catch(() => {
          setLoading(false);
          showSnackbar('Something went wrong', 'error');
        });
    } else {
      handleOpenEnterPayoutModal();
    }
  }

  const handleOpenEnterPayoutModal = () => {
    setIsEnterPayoutModalOpen(true);
  };
  const handleCloseEnterPayoutModal = () => {
    setIsEnterPayoutModalOpen(false);
  };

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            New Timesheet: {date.format('MMMM DD, YYYY')}
          </StyledTypography>

          <Box>
            <StyledButton
              disabled={loading || timeEntries.length === 0}
              variant="light-blue"
              size="small"
              textTransform="uppercase"
              onClick={() => handleAction('save')}
            >
              Save
            </StyledButton>
            {project.student_type_of_billing !== 'custom_type' && (
              <StyledButton
                disabled={loading || timeEntries.length === 0}
                style={{ marginLeft: '10px' }}
                size="small"
                textTransform="uppercase"
                onClick={() => handleAction('submit')}
              >
                Submit
              </StyledButton>
            )}
          </Box>
        </Box>
      </PageHeader>

      <Table>
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '250px' }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell>Task</StyledTableCell>
            <StyledTableCell>Hours</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeEntries.map((timeEntry, index) => (
            <TimeEntryItem
              key={index}
              timeEntry={timeEntry}
              index={index}
              editTimeEntry={editTimeEntry}
              deleteTimeEntry={deleteTimeEntry}
            />
          ))}
        </TableBody>
      </Table>
      {isOpenEditor ? (
        <AddTimeEntryForm setIsOpenEditor={setIsOpenEditor} addTimeEntry={addTimeEntry} />
      ) : (
        <StyledButton
          textTransform="capitalize"
          style={{ marginTop: '10px' }}
          fontWeight="bold"
          variant="dashed-light-blue"
          fullWidth
          startIcon={<AddIcon />}
          onClick={handleAddTimeEntry}
        >
          New entry
        </StyledButton>
      )}

      <EnterPayoutModal
        isOpen={isEnterPayoutModalOpen}
        handleClose={handleCloseEnterPayoutModal}
        contractId={contractId}
      />
    </>
  );
}

export default NewTimesheet;

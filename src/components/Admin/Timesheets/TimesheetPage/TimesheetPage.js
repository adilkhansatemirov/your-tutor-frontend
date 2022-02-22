import { useContext, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import TableSide from './TableSide/TableSide';
import InfoSide from './InfoSide/InfoSide';
import { capitalize } from 'utils/common';
import theme from 'theme';
import PageBar from 'components/Shared/UI/PageBar';
import RejectModal from './RejectModal/RejectModal';
import { getTimesheetById, updateTimesheet } from 'services/admin/timesheets';
import { SnackbarContext } from 'context/snackbarContext';
import { payFreelancer } from 'services/admin/timesheets';
import { useParams } from 'react-router-dom';
import PageLoader from 'components/Shared/Utils/PageLoader';

function TimesheetPage() {
  const { showSnackbar } = useContext(SnackbarContext);
  const { timesheetId } = useParams();

  const [loading, setLoading] = useState(true);
  const [timesheet, setTimesheet] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const fetchTimesheet = () => {
    getTimesheetById(timesheetId)
      .then((response) => {
        setTimesheet(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status !== 404) {
          showSnackbar('Something went wrong', 'error');
        }
      });
  };

  useEffect(() => {
    fetchTimesheet();
    // eslint-disable-next-line
  }, []);

  const [rejectModalIsOpen, setRejectModalIsOpen] = useState(false);

  const handleOpenRejectModal = () => {
    setRejectModalIsOpen(true);
  };
  const handleCloseRejectModal = () => {
    setRejectModalIsOpen(false);
  };

  function handleApprove() {
    setSubmitting(true);
    updateTimesheet({ id: timesheet.id, timesheet_status: 'approved' })
      .then(() => {
        fetchTimesheet();
        setSubmitting(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setSubmitting(false);
      });
  }

  function handlePayFreelancerTimesheets() {
    setSubmitting(true);
    payFreelancer(timesheet.id)
      .then(() => {
        fetchTimesheet();
        setSubmitting(false);
      })
      .catch((error) => {
        showSnackbar(error.response.data.errors.toString(), 'error');
      });
  }

  return loading ? (
    <PageLoader />
  ) : (
    <>
      {(timesheet.timesheet_status === 'paid' || timesheet.timesheet_status === 'rejected') && (
        <PageBar
          text={capitalize(timesheet.timesheet_status)}
          barColor={timesheet.timesheet_status === 'paid' ? theme.palette.green.main : theme.palette.tomatoRed.main}
          textColor="white"
        />
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{
          marginTop:
            timesheet.timesheet_status === 'paid' || timesheet.timesheet_status === 'rejected' ? '45px' : '25px',
        }}
      >
        <StyledTypography fontWeight="medium" fontSize="22px" fontFamily="Rubik">
          Timesheet:{' '}
          {timesheet.freelancer
            ? `${timesheet.freelancer.first_name} ${timesheet.freelancer.last_name}`
            : 'Deleted user'}
        </StyledTypography>
        <Box>
          {timesheet.timesheet_status === 'submitted' && (
            <StyledButton
              disabled={submitting}
              style={{ marginRight: '10px' }}
              onClick={handleApprove}
              size="small"
              variant="light-blue"
              textTransform="uppercase"
            >
              approve
            </StyledButton>
          )}
          {timesheet.timesheet_status === 'submitted' && (
            <StyledButton
              size="small"
              variant="red"
              textTransform="uppercase"
              disabled={submitting}
              onClick={handleOpenRejectModal}
            >
              reject
            </StyledButton>
          )}
          {timesheet.timesheet_status === 'approved' && (
            <StyledButton
              variant="light-blue"
              size="small"
              textTransform="uppercase"
              onClick={handlePayFreelancerTimesheets}
              disabled={submitting}
            >
              pay
            </StyledButton>
          )}
        </Box>
      </Box>

      <Box display="flex" style={{ marginTop: '35px' }}>
        <TableSide timesheet={timesheet} />
        <InfoSide timesheet={timesheet} />
      </Box>

      <RejectModal
        open={rejectModalIsOpen}
        onClose={handleCloseRejectModal}
        timesheet={timesheet}
        fetchTimesheet={fetchTimesheet}
      />
    </>
  );
}

export default TimesheetPage;

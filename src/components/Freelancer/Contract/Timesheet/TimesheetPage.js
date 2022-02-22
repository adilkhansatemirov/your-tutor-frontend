import { Box, capitalize } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import PageBar from 'components/Shared/UI/PageBar';
import PageLoader from 'components/Shared/Utils/PageLoader';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { deleteTimesheet, getTimesheet, updateTimesheet } from 'services/freelancer/timesheets';
import TableSide from './TableSide/TableSide';
import InfoSide from './InfoSide';
import theme from 'theme';
import StyledButton from 'components/Shared/Styled/StyledButton';
import ConfirmationModal from 'components/Shared/Utils/ConfirmationModal';

function TimesheetPage() {
  const history = useHistory();
  const { timesheetId } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [timesheet, setTimesheet] = useState(null);
  const { showSnackbar } = useContext(SnackbarContext);

  const fetchTimesheet = () => {
    getTimesheet(timesheetId)
      .then((response) => {
        setTimesheet(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status !== 404) {
          showSnackbar('Something went wrong', 'error');
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchTimesheet();
    // eslint-disable-next-line
  }, []);

  const handleSubmitTimesheet = () => {
    setLoading(true);
    updateTimesheet(timesheet.id, { timesheet: { timesheet_status: 'submitted' } })
      .then(() => {
        setLoading(false);
        fetchTimesheet();
      })
      .catch(() => {
        setLoading(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  const handleDeleteTimesheet = () => {
    setSubmitting(true);
    deleteTimesheet(timesheet.id)
      .then(() => {
        setSubmitting(false);
        history.goBack();
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
      });
  };

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

        {(timesheet.timesheet_status === 'edited' || timesheet.timesheet_status === 'rejected') && (
          <Box>
            {timesheet.project.client_type_of_billing !== 'custom_type' && (
              <StyledButton
                variant="green"
                disabled={loading || submitting}
                size="small"
                textTransform="uppercase"
                onClick={handleSubmitTimesheet}
              >
                Submit
              </StyledButton>
            )}
            <StyledButton
              disabled={loading || submitting}
              variant="red"
              style={{ marginLeft: '10px' }}
              size="small"
              textTransform="uppercase"
              onClick={() => setIsConfirmationModalOpen(true)}
            >
              Delete
            </StyledButton>
          </Box>
        )}
      </Box>

      <Box display="flex" style={{ marginTop: '35px' }}>
        <TableSide timesheet={timesheet} fetchTimesheet={fetchTimesheet} />
        <InfoSide timesheet={timesheet} />
      </Box>

      <ConfirmationModal
        promtText="Are you sure you want to delete this timesheet?"
        loading={submitting}
        isOpen={isConfirmationModalOpen}
        handleClose={() => setIsConfirmationModalOpen(false)}
        handleConfirmAction={handleDeleteTimesheet}
        handleCancelAction={() => setIsConfirmationModalOpen(false)}
      />
    </>
  );
}

export default TimesheetPage;

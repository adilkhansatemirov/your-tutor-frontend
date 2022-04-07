import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledCheckbox from 'components/Shared/Styled/StyledCheckbox';
import { FormControlLabel, List, ListItem, Box } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'context/authContext';
import { getAllowedNotifications, putAllowedNotifications } from 'services/notificationsSettings';
import { generateExpressDashboardLink } from 'services/freelancer/freelancers';
import { useForm, Controller } from 'react-hook-form';
import { SnackbarContext } from 'context/snackbarContext';
import ResetPasswordModal from './ResetPasswordModal/ResetPasswordModal';
import PageHeader from 'components/Shared/UI/PageHeader';
import InfoBox from 'components/Shared/UI/InfoBox';
import { Link } from 'react-router-dom';

function Settings() {
  const { showSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(AuthContext);
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      new_opportunity_available: false,
      project_bid_accepted: false,
      timesheet_rejected: false,
    },
  });
  const onSubmit = (values) => {
    let userId = user?.user.id;
    putAllowedNotifications(userId, values)
      .then(() => {
        showSnackbar('Settings saved successfully', 'success');
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
      });
  };

  useEffect(() => {
    let userId = user?.user.id;
    if (userId) {
      getAllowedNotifications(userId)
        .then((response) => {
          let data = response.data;
          setValue('new_opportunity_available', data.new_opportunity_available);
          setValue('project_bid_accepted', data.project_bid_accepted);
          setValue('timesheet_rejected', data.timesheet_rejected);
        })
        .catch(() => {
          showSnackbar('Something went wrong', 'error');
        });
    }
    // eslint-disable-next-line
  }, [user]);

  const handleRedirectToExpressDashboard = () => {
    generateExpressDashboardLink()
      .then((response) => {
        window.open(response.data.link.url);
      })
      .catch(() => showSnackbar('Something went wrong', 'error'));
  };

  const [resetPasswordModalIsOpen, setResetPasswordModalIsOpen] = useState(false);

  const handleOpenResetPasswordModal = () => {
    setResetPasswordModalIsOpen(true);
  };
  const handleCloseResetPasswordModal = () => {
    setResetPasswordModalIsOpen(false);
  };

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            Settings
          </StyledTypography>
        </Box>
      </PageHeader>
      <InfoBox>
        <StyledTypography type="h3" fontSize={17} fontFamily="Rubik" fontWeight="medium">
          Profile Info
        </StyledTypography>
        <Box style={{ marginTop: '20px' }}>
          <Link to={`/tutor/settings/edit-profile-info`} style={{ textDecoration: 'none' }}>
            <StyledButton style={{ marginLeft: '10px' }} textTransform="uppercase" variant="light-blue" size="small">
              Edit
            </StyledButton>
          </Link>
        </Box>
      </InfoBox>
      <InfoBox>
        <StyledTypography type="h3" fontSize={17} fontFamily="Rubik" fontWeight="medium">
          Payout Settings
        </StyledTypography>
        <Box style={{ marginTop: '20px' }}>
          {user.freelancer_detail.connected_account_id ? (
            <StyledButton
              textTransform="uppercase"
              variant="light-blue"
              size="small"
              onClick={handleRedirectToExpressDashboard}
            >
              Edit Payout Information
            </StyledButton>
          ) : (
            <a
              style={{ textDecoration: 'none' }}
              href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${process.env.REACT_APP_APP_URL}/freelancer/contracts&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&stripe_user[email]=${user.user.email}`}
            >
              <StyledButton textTransform="uppercase" variant="light-blue" size="small">
                Enter Payout Information
              </StyledButton>
            </a>
          )}
        </Box>
      </InfoBox>
      <InfoBox>
        <StyledTypography type="h3" fontSize={17} fontFamily="Rubik" fontWeight="medium">
          Reset Password
        </StyledTypography>
        <Box style={{ marginTop: '20px' }}>
          <StyledButton
            textTransform="uppercase"
            variant="light-blue"
            size="small"
            onClick={handleOpenResetPasswordModal}
          >
            Reset
          </StyledButton>
        </Box>
      </InfoBox>
      <InfoBox>
        <StyledTypography type="h3" fontSize={17} fontFamily="Rubik" fontWeight="medium">
          Notification Settings
        </StyledTypography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <List>
            <ListItem style={{ paddingLeft: '0px' }}>
              <Controller
                control={control}
                name="new_opportunity_available"
                render={({ onChange, onBlur, value, name }) => (
                  <FormControlLabel
                    control={
                      <StyledCheckbox
                        onBlur={onBlur}
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        name={name}
                      />
                    }
                    label="New Opportunity Available"
                  />
                )}
              />
            </ListItem>
            <ListItem style={{ paddingLeft: '0px' }}>
              <Controller
                control={control}
                name="project_bid_accepted"
                render={({ onChange, onBlur, value, name }) => (
                  <FormControlLabel
                    control={
                      <StyledCheckbox
                        onBlur={onBlur}
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        name={name}
                      />
                    }
                    label="Project Bid Accepted"
                  />
                )}
              />
            </ListItem>
            <ListItem style={{ paddingLeft: '0px' }}>
              <Controller
                control={control}
                name="timesheet_rejected"
                render={({ onChange, onBlur, value, name }) => (
                  <FormControlLabel
                    control={
                      <StyledCheckbox
                        onBlur={onBlur}
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        name={name}
                      />
                    }
                    label="Timesheet Rejected"
                  />
                )}
              />
            </ListItem>
          </List>

          <StyledButton type="submit" size="small" variant="light-blue" textTransform="uppercase">
            Save
          </StyledButton>
        </form>
      </InfoBox>
      <ResetPasswordModal
        open={resetPasswordModalIsOpen}
        onClose={handleCloseResetPasswordModal}
        freelancer={user.user}
        handleCloseResetPasswordModal={handleCloseResetPasswordModal}
      />
    </>
  );
}

export default Settings;

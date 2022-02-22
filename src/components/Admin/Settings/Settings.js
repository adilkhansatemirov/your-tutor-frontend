import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledCheckbox from 'components/Shared/Styled/StyledCheckbox';
import { Box, FormControlLabel, List, ListItem } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'context/authContext';
import { getAllowedNotifications, putAllowedNotifications } from 'services/notificationsSettings';
import { useForm, Controller } from 'react-hook-form';
import { SnackbarContext } from 'context/snackbarContext';
import PageHeader from 'components/Shared/UI/PageHeader';
import InfoBox from 'components/Shared/UI/InfoBox';

function Settings() {
  const { showSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(AuthContext);
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      new_timesheet_submitted: false,
      new_freelancer_signed_up: false,
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
          setValue('new_timesheet_submitted', data.new_timesheet_submitted);
          setValue('new_freelancer_signed_up', data.new_freelancer_signed_up);
        })
        .catch(() => {
          showSnackbar('Something went wrong', 'error');
        });
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            Settings
          </StyledTypography>
          <StyledButton
            onClick={handleSubmit(onSubmit)}
            type="submit"
            variant="light-blue"
            size="small"
            textTransform="uppercase"
          >
            Save
          </StyledButton>
        </Box>
      </PageHeader>
      <InfoBox>
        <StyledTypography style={{ marginBottom: '10px' }} fontFamily="Rubik" fontWeight="bold" fontSize={17}>
          Notification
        </StyledTypography>
        <List style={{ marginBottom: '15px' }}>
          <ListItem style={{ paddingLeft: '0px' }}>
            <Controller
              control={control}
              name="new_timesheet_submitted"
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
                  label="New Timesheet Submitted"
                />
              )}
            />
          </ListItem>
          <ListItem style={{ paddingLeft: '0px' }}>
            <Controller
              control={control}
              name="new_freelancer_signed_up"
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
                  label="New Freelancer Signed Up"
                />
              )}
            />
          </ListItem>
        </List>
      </InfoBox>
    </>
  );
}

export default Settings;

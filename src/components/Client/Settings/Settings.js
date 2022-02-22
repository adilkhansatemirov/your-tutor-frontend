import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledCheckbox from 'components/Shared/Styled/StyledCheckbox';
import { FormControlLabel, Box } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'context/authContext';
import { getAllowedNotifications, putAllowedNotifications } from 'services/notificationsSettings';
import { useForm, Controller } from 'react-hook-form';
import { SnackbarContext } from 'context/snackbarContext';
import { addBankAccount, addCreditCard } from 'services/client/clientDetails';
import FastIcon from 'components/Shared/Utils/FastIcon';
import useStyles from './Settings.style';
import PageHeader from 'components/Shared/UI/PageHeader';
import InfoBox from 'components/Shared/UI/InfoBox';

function Settings() {
  const classes = useStyles();
  const { showSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(AuthContext);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      new_invoice_submitted: false,
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
          setValue('new_invoice_submitted', data.new_invoice_submitted);
        })
        .catch(() => {
          showSnackbar('Something went wrong', 'error');
        });
    }
    // eslint-disable-next-line
  }, [user]);

  const configureBankHandler = () => {
    const linkHandler = window['Plaid'].create({
      env: process.env.REACT_APP_PLAID_HOST,
      clientName: 'Symbiotries Inc.',
      key: process.env.REACT_APP_PLAID_KEY,
      product: ['auth'],
      onSuccess: handleAddPlaidToken,
      onExit: function () {},
    });
    linkHandler.open();
  };

  const handleAddPlaidToken = (public_token, metadata) => {
    addBankAccount({
      public_token: public_token,
      account_id: metadata.account_id,
    })
      .then(() => {
        showSnackbar('Your bank account has been successully added', 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.errors.toString(), 'error');
      });
  };

  const configureCardHandler = () => {
    const linkHandler = window.StripeCheckout.configure({
      key: process.env.REACT_APP_CHECKOUT_KEY,
      image: 'https://s3.amazonaws.com/symbiotries-web/images/fishlogo.png',
      locale: 'auto',
      token: (token) => {
        addCreditCard({
          token_id: token.id,
        })
          .then(() => {
            showSnackbar('Your card info has been successully added', 'success');
          })
          .catch(() => {
            showSnackbar('Something went wrong', 'error');
          });
      },
    });
    linkHandler.open({
      email: user.user.email,
    });
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledTypography style={{ marginBottom: '10px' }} fontFamily="Rubik" fontWeight="bold" fontSize={17}>
            Notification
          </StyledTypography>
          <Controller
            control={control}
            name="new_invoice_submitted"
            render={({ onChange, onBlur, value, name }) => (
              <FormControlLabel
                className={classes.formControl}
                control={
                  <StyledCheckbox
                    onBlur={onBlur}
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    name={name}
                  />
                }
                label="New Invoice Submitted"
              />
            )}
          />
        </form>
      </InfoBox>
      <InfoBox>
        <StyledTypography style={{ marginBottom: '30px' }} fontFamily="Rubik" fontWeight="bold" fontSize={17}>
          Payment Information
        </StyledTypography>
        <Box className={classes.cardWrapper}>
          <Box className={classes.card} onClick={configureBankHandler}>
            <FastIcon width="80px" height="79px" iconName="bankAccount" />
            <Box display="flex" alignItems="center">
              <StyledTypography type="h3" fontWeight="bold" className={classes.text}>
                Add Bank Account
              </StyledTypography>
              <FastIcon iconName="arrow-right-white" />
            </Box>
          </Box>
          <Box className={classes.card} onClick={configureCardHandler}>
            <FastIcon width="74px" height="75px" iconName="creditCard" />
            <Box display="flex" alignItems="center">
              <StyledTypography type="h3" fontWeight="bold" className={classes.text}>
                Add Credit Card
              </StyledTypography>
              <FastIcon iconName="arrow-right" />
            </Box>
          </Box>
        </Box>
      </InfoBox>
    </>
  );
}

export default Settings;

import React, { useContext } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import FastIcon from 'components/Shared/Utils/FastIcon';
import { addBankAccount, addCreditCard } from 'services/client/clientDetails';
import { AuthContext } from 'context/authContext';
import { SnackbarContext } from 'context/snackbarContext';

const useStyles = makeStyles(() => ({
  cardWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '25px',
    width: '50%',
    height: '170px',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover $text': {
      marginRight: '15px',
    },
    color: '#012C5D',
    '&:first-child': {
      marginRight: '25px',
      backgroundColor: '#004BA1',
    },
    '&:first-child $text': {
      color: '#fff',
    },
    '&:nth-child(2)': {
      background: '#F6F7FB',
      border: '1px solid #012C5D',
      boxSizing: 'border-box',
    },
  },
  text: {
    marginRight: '10px',
    transition: 'all .3s',
  },
  textWrapper: {
    cursor: 'pointer',
    '&:hover $text': {
      marginRight: '15px',
    },
  },
}));

function PaymentInfo() {
  const classes = useStyles();
  const { showSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  // function configureBankHandler() {
  //   const linkHandler = window['Plaid'].create({
  //     env: process.env.REACT_APP_PLAID_HOST,
  //     clientName: 'Symbiotries Inc.',
  //     key: process.env.REACT_APP_PLAID_KEY,
  //     product: ['auth'],
  //     onSuccess: handleAddPlaidToken,
  //     onExit: function () {},
  //   });
  //   linkHandler.open();
  // }

  function configureBankHandler() {
    addBankAccount({
      public_token: 'test',
      account_id: 'test',
    })
      .then(() => {
        history.push('/student/invoices');
        showSnackbar('Your bank account has been successully added', 'success');
      })
      .catch((error) => {
        showSnackbar(error.response.data.errors.toString(), 'error');
      });
  }

  function configureCardHandler() {
    // const linkHandler = window.StripeCheckout.configure({
    //   key: process.env.REACT_APP_CHECKOUT_KEY,
    //   image: 'https://s3.amazonaws.com/symbiotries-web/images/fishlogo.png',
    //   locale: 'auto',
    //   token: (token) => {
    addCreditCard({
      token_id: 'test',
    })
      .then(() => {
        history.push('/student/invoices');
        showSnackbar('Your card info has been successully added', 'success');
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
      });
    //   },
    // });
    // linkHandler.open({
    //   email: user.user.email,
    // });
  }

  return (
    <Box display="flex" flexDirection="column" style={{ height: '100%' }}>
      <StyledTypography type="h1" fontSize={35} fontWeight="bold">
        Payment information
      </StyledTypography>
      <Box className={classes.cardWrapper}>
        <Box className={classes.card} onClick={configureBankHandler}>
          <FastIcon width="80px" height="79px" iconName="bankAccount" />
          <Box display="flex" alignItems="center">
            <StyledTypography type="h3" fontWeight="bold" fontSize={24} className={classes.text}>
              Add Bank Account
            </StyledTypography>
            <FastIcon iconName="arrow-right" />
          </Box>
        </Box>
        <Box className={classes.card} onClick={configureCardHandler}>
          <FastIcon width="74px" height="75px" iconName="creditCard" />
          <Box display="flex" alignItems="center">
            <StyledTypography type="h3" fontWeight="bold" fontSize={24} className={classes.text}>
              Add Credit Card
            </StyledTypography>
            <FastIcon iconName="arrow-right" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PaymentInfo;

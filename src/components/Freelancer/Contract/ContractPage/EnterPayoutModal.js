import { useContext } from 'react';
import { Box, Modal, makeStyles } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import { AuthContext } from 'context/authContext';

const useStyles = makeStyles(() => ({
  modalTitle: {
    marginBottom: '15px',
  },
  modalBody: {
    width: '437px',
    position: 'absolute',
    top: '50%',
    outline: 'none',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
  },
  buttonGroup: {
    marginTop: '20px',
    justifyContent: 'center',
    display: 'flex',
  },
  enterPayoutButton: {
    padding: '13px 35px',
  },
  link: {
    textDecoration: 'none',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function EnterPayoutModal({ isOpen, handleClose }) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className={classes.modalBody}>
        <StyledTypography className={classes.modalTitle}  align="center" type="h3" weight="bold">
          You need to enter your payout information in order to create a timesheet
        </StyledTypography>
        <Box className={classes.buttonGroup}>
          <a
            className={classes.link}
            href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${process.env.REACT_APP_APP_URL}/freelancer/contracts&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&stripe_user[email]=${user.user.email}`}
          >
            <StyledButton variant="blue" className={classes.enterPayoutButton} fullWidth>
              Enter Payout Information
            </StyledButton>
          </a>
        </Box>
      </Box>
    </Modal>
  );
}

export default EnterPayoutModal;

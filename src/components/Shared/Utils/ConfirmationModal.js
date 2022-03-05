import { Box, CircularProgress, Modal, makeStyles } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';

const useStyles = makeStyles(() => ({
  modalBody: {
    width: '300px',
    position: 'absolute',
    top: '50%',
    outline: 'none',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
  },
  buttonGroup: {
    marginTop: '18px',
    display: 'flex',
  },
  yesButton: {
    marginRight: '10px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function ConfirmationModal({ isOpen, handleClose, loading, promtText, handleConfirmAction, handleCancelAction }) {
  const classes = useStyles();

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className={classes.modalBody}>
        {loading ? (
          <Box className={classes.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <StyledTypography
              style={{ marginBottom: '10px' }}
              type="h3"
              fontSize={20}
              fontFamily="Rubik"
              fontWeight="medium"
            >
              Confirm Action
            </StyledTypography>
            <StyledTypography type="h3" fontSize={12} style={{ lineHeight: '20px' }} fontWeight="normal">
              {promtText}
            </StyledTypography>
            <Box className={classes.buttonGroup}>
              <StyledButton
                variant="light-blue"
                size="small"
                textTransform="uppercase"
                onClick={handleConfirmAction}
                className={classes.yesButton}
              >
                Yes
              </StyledButton>
              <StyledButton
                variant="outlined-dark-blue"
                textTransform="uppercase"
                size="small"
                onClick={handleCancelAction}
              >
                No
              </StyledButton>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;

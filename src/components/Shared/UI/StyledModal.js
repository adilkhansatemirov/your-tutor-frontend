import { Box, CircularProgress, Modal, makeStyles } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

const useStyles = makeStyles(() => ({
  modalBody: {
    width: '440px',
    position: 'absolute',
    top: '50%',
    outline: 'none',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
  },
  close: {
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#F7F7FA',
    width: '22px',
    height: '22px',
    borderRadius: '3px',
    position: 'relative',
    '&::before': {
      transform: 'rotate(45deg)',
      position: 'absolute',
      top: 7,
      left: 10,
      content: '""',
      width: '1px',
      height: '8px',
      backgroundColor: '#000',
    },
    '&::after': {
      transform: 'rotate(-45deg)',
      position: 'absolute',
      top: 7,
      left: 10,
      content: '""',
      width: '1px',
      height: '8px',
      backgroundColor: '#000',
    },
  },
}));

function StyledModal({ open, onClose, loading, header, children }) {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modalBody}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box style={{ marginBottom: '22px' }} display="flex" justifyContent="space-between" flexDirection="row">
              <StyledTypography type="h3" fontSize={20} fontFamily="Rubik" fontWeight="medium">
                {header}
              </StyledTypography>
              <button className={classes.close} onClick={onClose} />
            </Box>
            {children}
          </>
        )}
      </Box>
    </Modal>
  );
}

export default StyledModal;

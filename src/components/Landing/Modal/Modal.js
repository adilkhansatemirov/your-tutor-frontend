import React from 'react';

import { Box, Dialog } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import SignUp from './SignUp/SignUp';
import EnterCode from './EnterCode/EnterCode';
import RequestDemo from './RequestDemo/RequestDemo';
import useStyles from './Modal.style';

import { modalTemplates } from 'constants/constants';
import ContactSupport from './ContactSupport/ContactSupport';

function Modal({ template, open, closeModal, setModalTemplate }) {
  const classes = useStyles();

  const renderHeaderText = (template) => {
    switch (template) {
      case modalTemplates.signUp:
        return 'Join the YourTutor';
      case modalTemplates.enterCode:
        return 'Enter Code';
      case modalTemplates.requestDemo:
        return 'Schedule a Demo';
      case modalTemplates.contactSupport:
        return 'Contact Support';
      default:
        return 'Default Header';
    }
  };

  const renderModal = (template) => {
    switch (template) {
      case modalTemplates.signUp:
        return <SignUp setModalTemplate={setModalTemplate} closeModal={closeModal} />;
      case modalTemplates.enterCode:
        return <EnterCode setModalTemplate={setModalTemplate} closeModal={closeModal} />;
      case modalTemplates.requestDemo:
        return <RequestDemo setModalTemplate={setModalTemplate} closeModal={closeModal} />;
      case modalTemplates.contactSupport:
        return <ContactSupport setModalTemplate={setModalTemplate} closeModal={closeModal} />;
      default:
        return <SignUp setModalTemplate={setModalTemplate} closeModal={closeModal} />;
    }
  };

  return (
    <Dialog className={classes.dialog} maxWidth="md" open={open} onClose={closeModal}>
      <Box className={classes.root}>
        <Box className={classes.modalHeaderWrapper}>
          <StyledTypography fontFamily="Poppins" className={classes.title} type="h2" fontSize={30} fontWeight="bold">
            {renderHeaderText(template)}
          </StyledTypography>
        </Box>
        <Box className={classes.formWrapper}>{renderModal(template)}</Box>
      </Box>
    </Dialog>
  );
}

export default Modal;

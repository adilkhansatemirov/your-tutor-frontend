import { useState, useContext } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import FastIcon from 'components/Shared/Utils/FastIcon';
import { SnackbarContext } from 'context/snackbarContext';
import ResetPasswordModal from './ResetPasswordModal/ResetPasswordModal';
import ConfirmationModal from 'components/Shared/Utils/ConfirmationModal';
import { blockUser, unblockUser } from 'services/admin/users';
import useStyles from './ClientActions.style';

function FreelancerActions({ client, fetchClients }) {
  const classes = useStyles();
  const { showSnackbar } = useContext(SnackbarContext);

  const [confirmationModalLoading, setConfirmationModalLoading] = useState(false);
  const [confirmationModalState, setConfirmationModalState] = useState({ isOpen: false, prompt: '', action: '' });
  const handleOpenConfirmationModal = (action) => {
    handleCloseMenu();
    setConfirmationModalState({
      isOpen: true,
      prompt: `Are you sure you want to ${action.toLowerCase()} ${client.user.first_name} ${client.user.last_name}?`,
      action,
    });
  };
  const handleCloseConfirmationModal = () => {
    setConfirmationModalState({
      isOpen: false,
      prompt: '',
      action: '',
    });
  };
  const handleConfirmUserAction = async () => {
    setConfirmationModalLoading(true);
    const action = confirmationModalState.action;

    if (action === 'Block user') await blockUser(client.user.id);
    if (action === 'Unblock user') await unblockUser(client.user.id);

    showSnackbar('Action completed', 'success');
    setConfirmationModalLoading(false);
    fetchClients();
    handleCloseConfirmationModal();
  };

  const [resetPasswordModalIsOpen, setResetPasswordModalIsOpen] = useState(false);
  const handleOpenResetPasswordModal = () => {
    handleCloseMenu();
    setResetPasswordModalIsOpen(true);
  };
  const handleCloseResetPasswordModal = () => {
    setResetPasswordModalIsOpen(false);
  };

  const [optionsMenuAnchorEl, setOptionsMenuAnchorEl] = useState(null);
  const handleOpenMenu = (event) => {
    setOptionsMenuAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOptionsMenuAnchorEl(null);
  };

  return (
    <>
      <Button
        classes={{ root: classes.actionButton, label: classes.actionButtonLabel }}
        onClick={handleOpenMenu}
        endIcon={<FastIcon width="24" height="28" className={classes.selectIcon} iconName="arrow-down" />}
      >
        Action
      </Button>
      <Menu
        anchorEl={optionsMenuAnchorEl}
        classes={{ paper: classes.actionMenu }}
        keepMounted
        open={Boolean(optionsMenuAnchorEl)}
        onClose={handleCloseMenu}
      >
        {client.profile_status !== 'blocked' && (
          <MenuItem onClick={() => handleOpenConfirmationModal('Block user')}>Block user</MenuItem>
        )}
        {client.profile_status === 'blocked' && (
          <MenuItem onClick={() => handleOpenConfirmationModal('Unblock user')}>Unblock user</MenuItem>
        )}
        <MenuItem onClick={() => handleOpenResetPasswordModal()}>Change password</MenuItem>
      </Menu>
      <ConfirmationModal
        isOpen={confirmationModalState.isOpen}
        handleClose={handleCloseConfirmationModal}
        loading={confirmationModalLoading}
        promtText={confirmationModalState.prompt}
        handleConfirmAction={handleConfirmUserAction}
        handleCancelAction={handleCloseConfirmationModal}
      />

      <ResetPasswordModal open={resetPasswordModalIsOpen} onClose={handleCloseResetPasswordModal} client={client} />
    </>
  );
}

export default FreelancerActions;

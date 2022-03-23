import { Box } from '@material-ui/core';
import ConfirmationModal from 'components/Shared/Utils/ConfirmationModal';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useState } from 'react';
import { deactivateProject } from 'services/admin/projects';
import Client from './Client';
import DangerZone from './DangerZone';
import Description from './Description';
import Error from './Error';
import Freelancer from './Freelancer';

function InfoSide({ project, fetchProject }) {
  const { showSnackbar } = useContext(SnackbarContext);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeactivate = () => {
    setLoading(true);
    deactivateProject(project.id)
      .then(() => {
        fetchProject();
        setLoading(false);
        setIsConfirmationModalOpen(false);
      })
      .catch(() => {
        fetchProject();
        setIsConfirmationModalOpen(false);
        setLoading(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  return (
    <>
      <Box style={{ width: '30%' }}>
        <Error project={project} />
        <Client project={project} fetchProject={fetchProject} loading={loading} setLoading={setLoading} />
        <Freelancer project={project} />
        <Description project={project} />
        <DangerZone project={project} loading={loading} setIsConfirmationModalOpen={setIsConfirmationModalOpen} />
      </Box>
      <ConfirmationModal
        promtText="This action is irreversible, are you sure you want to deactivate this project?"
        loading={loading}
        isOpen={isConfirmationModalOpen}
        handleClose={() => setIsConfirmationModalOpen(false)}
        handleConfirmAction={handleDeactivate}
        handleCancelAction={() => setIsConfirmationModalOpen(false)}
      />
    </>
  );
}

export default InfoSide;

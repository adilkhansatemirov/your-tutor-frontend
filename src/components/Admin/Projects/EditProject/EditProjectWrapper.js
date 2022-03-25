import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLoader from 'components/Shared/Utils/PageLoader';
import { getProject } from 'services/admin/projects';
import { SnackbarContext } from 'context/snackbarContext';
import EditProject from 'components/Admin/Projects/EditProject/EditProject';

function EditProjectWrapper() {
  const { showSnackbar } = useContext(SnackbarContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const { projectId } = useParams();

  const fetchProject = () => {
    getProject(projectId)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status !== 404) {
          showSnackbar('Something went wrong', 'error');
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, []);

  return loading ? <PageLoader /> : <EditProject project={project} fetchProject={fetchProject} />;
}

export default EditProjectWrapper;

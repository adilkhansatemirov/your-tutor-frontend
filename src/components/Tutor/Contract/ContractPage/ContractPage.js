import { Box } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from 'context/snackbarContext';
import { getProject } from 'services/freelancer/projects';
import { Link, useParams } from 'react-router-dom';
import PageLoader from 'components/Shared/Utils/PageLoader';
import PageHeader from 'components/Shared/UI/PageHeader';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import TimesheetsSide from './TimesheetsSide';
import InfoSide from './InfoSide';
import StyledButton from 'components/Shared/Styled/StyledButton';

function ProjectPage() {
  const { contractId } = useParams();

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState([]);
  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, []);

  const fetchProject = () => {
    getProject(contractId)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status !== 404) {
          showSnackbar('Something went wrong', 'error');
          setLoading(false);
        }
      });
  };

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            Project: {project.title}
          </StyledTypography>
          <Link to={`/tutor/contracts/${project.id}/timesheets/new`} style={{ textDecoration: 'none' }}>
            <StyledButton variant="dark-blue" size="small" textTransform="uppercase">
              New timesheet
            </StyledButton>
          </Link>
        </Box>
      </PageHeader>
      <Box display="flex" style={{ marginTop: '35px' }}>
        <TimesheetsSide project={project} fetchProject={fetchProject} />
        <InfoSide project={project} fetchProject={fetchProject} />
      </Box>
    </>
  );
}

export default ProjectPage;

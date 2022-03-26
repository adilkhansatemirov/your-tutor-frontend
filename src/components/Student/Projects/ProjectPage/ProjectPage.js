import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import PageBar from 'components/Shared/UI/PageBar';
import PageLoader from 'components/Shared/Utils/PageLoader';
import { SnackbarContext } from 'context/snackbarContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from 'services/client/projects';
import theme from 'theme';
import InfoSide from './InfoSide/InfoSide';
import MainSide from './MainSide/MainSide';

function ProjectPage() {
  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);

  const { projectId } = useParams();
  const { showSnackbar } = useContext(SnackbarContext);

  const fetchProject = () => {
    getProject(projectId)
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

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <PageLoader />
  ) : (
    <>
      {(project.project_status === 'accepting_bids' || project.project_status === 'assigning_freelancer') && (
        <PageBar
          text="Assigning Freelancer"
          barColor={theme.palette.lightYellow.main}
          textColor="black"
        />
      )}
      {project.project_status === 'inactive' && (
        <PageBar text="Deactivated" barColor={theme.palette.tomatoRed.main} textColor="white" />
      )}
      {project.project_status === 'error' && (
        <PageBar text="Error" barColor={theme.palette.tomatoRed.main} textColor="white" />
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{
          marginTop:
            project.project_status === 'assigning_freelancer' ||
            project.project_status === 'accepting_bids' ||
            project.project_status === 'inactive' ||
            project.project_status === 'error'
              ? '45px'
              : '25px',
        }}
      >
        <StyledTypography fontWeight="medium" fontSize="22px" fontFamily="Rubik">
          {project.title}
        </StyledTypography>
      </Box>
      <Box display="flex" style={{ marginTop: '35px' }}>
        <MainSide project={project} fetchProject={fetchProject} />
        <InfoSide project={project} fetchProject={fetchProject} />
      </Box>
    </>
  );
}

export default ProjectPage;

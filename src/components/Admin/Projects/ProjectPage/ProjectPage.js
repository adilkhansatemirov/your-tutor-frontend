import { Box } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import PageBar from 'components/Shared/UI/PageBar';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useEffect, useState } from 'react';
import { getProject } from 'services/admin/projects';
import theme from 'theme';
import { removeUnderscores, capitalize } from 'utils/common';
import InfoSide from './InfoSide/InfoSide';
import MainSide from './MainSide/MainSide';
import PageLoader from 'components/Shared/Utils/PageLoader';
import EnterPaymentAmount from './EnterPaymentAmount/EnterPaymentAmount';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { assignFreelancerToProject, startBids } from 'services/admin/projects';

function ProjectPage() {
  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { projectId } = useParams();

  const { showSnackbar } = useContext(SnackbarContext);

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

  const [showModal, setShowModal] = useState(false);

  const handleOpenPaymentAmountModal = () => {
    setShowModal(true);
  };
  const handleClosePaymentAmountModal = () => {
    setShowModal(false);
  };

  const {
    handleSubmit,
    errors,
    control,
  } = useForm({
    defaultValues: {
      tutor_payment_amount: 0,
    },
    resolver: yupResolver(
      Yup.object().shape({
        tutor_payment_amount: Yup.string().required('Required'),
      }),
    ),
  });
  const [freelancersToSendOpportunityTo, setFreelancersToSendOpportunityTo] = useState([]);
  const onSubmit = (values) => {
    setSubmitting(true);
    if (freelancersToSendOpportunityTo.length === 0) {
      showSnackbar('You need to select at least on freelancer', 'error');
      return;
    }

    let projectData = null;
    if (freelancersToSendOpportunityTo.length === 1) {
      projectData = {
        project_status: 'active',
        tutor_detail_id: freelancersToSendOpportunityTo[0].id,
        tutor_payment_amount: values.tutor_payment_amount,
      };
      assignFreelancerToProject(project.id, projectData)
        .then(() => {
          showSnackbar('Freelancer has been assigned', 'success');
          setSubmitting(false);
          fetchProject();
        })
        .catch(() => {
          showSnackbar('Something went wrong', 'success');
        });
    }

    if (freelancersToSendOpportunityTo.length > 1) {
      projectData = {
        project_status: 'accepting_bids',
        tutor_payment_amount: values.tutor_payment_amount,
      };
      const projectBids = freelancersToSendOpportunityTo.map((freelancer) => ({ user_id: freelancer.user.id }));
      startBids(project.id, { project_data: { project: projectData, project_bids: projectBids } })
        .then(() => {
          showSnackbar('Bids has been started', 'success');
          setSubmitting(false);
          fetchProject();
        })
        .catch(() => {
          showSnackbar('Something went wrong', 'error');
        });
    }
  };

  return loading ? (
    <PageLoader />
  ) : (
    <>
      {project.project_status === 'accepting_bids' && (
        <PageBar
          text={capitalize(removeUnderscores(project.project_status))}
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
        {project.project_status !== 'inactive' && (
          <Box display="flex">
            {(project.project_status === 'active' || project.project_status === 'error') && (
              <>
                {project.student_type_of_billing === 'custom_type' && (
                  <StyledButton
                    onClick={handleOpenPaymentAmountModal}
                    variant="green"
                    textTransform="uppercase"
                    size="small"
                    style={{ marginRight: '10px' }}
                  >
                    Pay
                  </StyledButton>
                )}
                <Link to={`/admin/projects/${project.id}/invoices/new`} style={{ textDecoration: 'none' }}>
                  <StyledButton
                    variant="light-blue"
                    textTransform="uppercase"
                    size="small"
                    style={{ marginRight: '10px' }}
                  >
                    Create Invoice
                  </StyledButton>
                </Link>
              </>
            )}
            {project.project_status === 'assigning_freelancer' && (
              <StyledButton
                textTransform="uppercase"
                onClick={() => handleSubmit(onSubmit)()}
                variant="light-blue"
                style={{ marginRight: '10px' }}
                size="small"
                disabled={submitting}
              >
                Assign
              </StyledButton>
            )}
            <Link to={`/admin/projects/${project.id}/edit`} style={{ textDecoration: 'none' }}>
              <StyledButton
                disabled={submitting}
                textTransform="uppercase"
                variant="light-blue"
                size="small"
              >
                Edit project
              </StyledButton>
            </Link>
          </Box>
        )}
      </Box>
      <Box display="flex" style={{ marginTop: '35px' }}>
        <MainSide
          project={project}
          fetchProject={fetchProject}
          freelancersToSendOpportunityTo={freelancersToSendOpportunityTo}
          setFreelancersToSendOpportunityTo={setFreelancersToSendOpportunityTo}
          errors={errors}
          control={control}
        />
        <InfoSide project={project} fetchProject={fetchProject} />
      </Box>
      <EnterPaymentAmount
        open={showModal}
        close={handleClosePaymentAmountModal}
        project={project}
        fetchProject={fetchProject}
      />
    </>
  );
}

export default ProjectPage;

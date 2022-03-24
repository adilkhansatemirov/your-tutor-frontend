import { Box, capitalize } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import theme from 'theme';
import { removeUnderscores } from 'utils/common';
import { createProject } from 'services/admin/projects';
import { useContext, useState } from 'react';
import { SnackbarContext } from 'context/snackbarContext';
import previousIcon from 'assets/icons/arrow-left-gray.svg';

function Review({
  client,
  setTemplate,
  newProject,
  isToAllFreelancers,
  freelancersToSendOpportunityTo,
  allFreelancers,
}) {
  const { showSnackbar } = useContext(SnackbarContext);
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const toOneFreelancer = () => {
    if (isToAllFreelancers) return false;
    return freelancersToSendOpportunityTo.length === 1;
  };

  const freelancersList = () => {
    if (isToAllFreelancers) return '(All)';
    let freelancersString = '';
    freelancersToSendOpportunityTo.forEach((freelancer) => {
      freelancersString += `${freelancer.user.email},\n`;
    });
    return freelancersString.substring(0, freelancersString.length - 2);
  };

  const postProject = () => {
    setSubmitting(true);
    let project = { ...newProject };
    let freelancers = [];

    if (toOneFreelancer()) {
      project.tutor_detail_id = freelancersToSendOpportunityTo[0].id;
      project.project_status = 'active';
    } else {
      freelancers = isToAllFreelancers ? [...allFreelancers] : [...freelancersToSendOpportunityTo];
      project.project_status = 'accepting_bids';
    }

    const project_data = {
      project,
      project_bids: freelancers.map((freelancer) => ({ user_id: freelancer.user.id })),
    };

    createProject(project_data)
      .then(() => {
        setSubmitting(false);
        showSnackbar('Project has been created', 'success');
        history.push('/admin/projects');
      })
      .catch(() => {
        setSubmitting(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  return (
    <>
      <StyledTypography fontWeight="bold" fontFamily="Rubik" fontSize="30px">
        Review
      </StyledTypography>
      <SectionTitle text="Client" template="client" setTemplate={setTemplate} />
      <Row itemName="Client name" itemValue={`${client.user.first_name} ${client.user.last_name}`} />
      <Row itemName="Email" itemValue={client.user.email} />
      <Row itemName="Company" itemValue={client.company_name} />

      <SectionTitle text="Project Information" template="project-name" setTemplate={setTemplate} />
      <Row itemName="Project title" itemValue={newProject.title} />
      <Row itemName="Project description" itemValue={newProject.description} />

      <SectionTitle text="Billing" template="invoicing-schedule" setTemplate={setTemplate} />
      <Row itemName="Type" itemValue={capitalize(removeUnderscores(newProject.student_type_of_billing))} />
      <Row
        itemName="Amount"
        itemValue={`$${newProject.student_payment_amount}${
          newProject.student_type_of_billing === 'hourly_rate' ? ' per hour' : ''
        }`}
      />
      <Row itemName="Invoicing Schedule" itemValue={capitalize(removeUnderscores(newProject.invoicing_schedule))} />

      <SectionTitle text="Freelancer" template="freelancer-payment-amount" setTemplate={setTemplate} />
      {toOneFreelancer() ? (
        <>
          <Row
            itemName="Freelancer Name"
            itemValue={`${freelancersToSendOpportunityTo[0].user.first_name} ${freelancersToSendOpportunityTo[0].user.last_name}`}
          />
          <Row itemName="Email" itemValue={freelancersToSendOpportunityTo[0].user.email} />
        </>
      ) : (
        <Row itemName="Freelancers" itemValue={freelancersList()} />
      )}
      <Row
        itemName="Amount"
        itemValue={`$${newProject.tutor_payment_amount}${
          newProject.student_type_of_billing === 'hourly_rate' ? ' per hour' : ''
        }`}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: '30px' }}>
        <StyledButton
          onClick={postProject}
          disabled={submitting}
          size="small"
          textTransform="uppercase"
          variant="light-blue"
        >
          Post project
        </StyledButton>
        <StyledButton
          fontWeight="normal"
          variant="text"
          size="small"
          type="button"
          onClick={() => setTemplate('specific-freelancer')}
          color={theme.palette.textGray}
        >
          <img src={previousIcon} alt="arrow left" style={{ marginRight: '8px' }} /> Previous step
        </StyledButton>
      </Box>
    </>
  );
}

function SectionTitle({ text, template, setTemplate }) {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: '20px', marginBottom: '5px' }}
      >
        <StyledTypography fontFamily="Rubik" fontSize="20px" fontWeight="bold">
          {text}
        </StyledTypography>
        <StyledButton
          onClick={() => setTemplate(template)}
          fontWeight="normal"
          color={theme.palette.skyBlue.main}
          variant="text"
          size="small"
        >
          Edit
        </StyledButton>
      </Box>
    </>
  );
}

function Row({ itemName, itemValue }) {
  return (
    <Box
      display="flex"
      style={{ borderBottom: `1px solid ${theme.palette.silverGray.main}`, marginBottom: '7px', paddingBottom: '4px' }}
    >
      <StyledTypography fontFamily="Rubik" style={{ width: '60%' }}>
        {itemName}
      </StyledTypography>
      <StyledTypography fontFamily="Rubik" style={{ width: '40%' }}>
        {itemValue}
      </StyledTypography>
    </Box>
  );
}

export default Review;

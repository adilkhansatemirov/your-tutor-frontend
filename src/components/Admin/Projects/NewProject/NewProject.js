import { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Welcome from './Templates/Welcome';
import Client from './Templates/Client';
import ProjectName from './Templates/ProjectName';
import Description from './Templates/Description';
import Duration from './Templates/Duration';
import InvoicingSchedule from './Templates/InvoicingSchedule';
import ClientTypeOfBilling from './Templates/ClientTypeOfBilling';
import ClientPaymentAmount from './Templates/ClientPaymentAmount';
import FreelancerPaymentAmount from './Templates/FreelancerPaymentAmount';
import SpecificFreelancer from './Templates/SpecificFreelancer';
import SelectFreelancers from './Templates/SelectFreelancers/SelectFreelancers';
import Review from './Templates/Review';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  container: {
    border: `1px solid ${theme.palette.silverGray.pale}`,
    width: '750px',
    borderRadius: '5px',
    marginTop: '100px',
    marginBottom: '100px',
    padding: '40px 60px',
  },
}));

function NewProject() {
  const classes = useStyles();
  const [template, setTemplate] = useState('welcome');
  const [newProject, setNewProject] = useState({
    student_detail_id: '',
    tutor_detail_id: null,
    title: '',
    description: '',
    project_duration: '',
    invoicing_schedule: 'one_time',
    student_type_of_billing: 'custom_type',
    student_payment_amount: '',
    tutor_payment_amount: '',
  });

  const [client, setClient] = useState(null);

  const [isToAllFreelancers, setIsToAllFreelancers] = useState(true);
  const [freelancersToSendOpportunityTo, setFreelancersToSendOpportunityTo] = useState([]);
  const [allFreelancers, setAllFreelancers] = useState([]);

  const renderTemplate = () => {
    switch (template) {
      case 'welcome':
        return <Welcome setTemplate={setTemplate} />;
      case 'client':
        return (
          <Client
            setTemplate={setTemplate}
            newProject={newProject}
            setNewProject={setNewProject}
            setClient={setClient}
          />
        );
      case 'project-name':
        return <ProjectName setTemplate={setTemplate} newProject={newProject} setNewProject={setNewProject} />;
      case 'description':
        return <Description setTemplate={setTemplate} newProject={newProject} setNewProject={setNewProject} />;
      case 'duration':
        return <Duration setTemplate={setTemplate} newProject={newProject} setNewProject={setNewProject} />;
      case 'invoicing-schedule':
        return <InvoicingSchedule setTemplate={setTemplate} newProject={newProject} setNewProject={setNewProject} />;
      case 'client-type-of-billing':
        return <ClientTypeOfBilling setTemplate={setTemplate} newProject={newProject} setNewProject={setNewProject} />;
      case 'client-payment-amount':
        return <ClientPaymentAmount setTemplate={setTemplate} newProject={newProject} setNewProject={setNewProject} />;
      case 'freelancer-payment-amount':
        return (
          <FreelancerPaymentAmount setTemplate={setTemplate} newProject={newProject} setNewProject={setNewProject} />
        );
      case 'specific-freelancer':
        return (
          <SpecificFreelancer
            setTemplate={setTemplate}
            isToAllFreelancers={isToAllFreelancers}
            setIsToAllFreelancers={setIsToAllFreelancers}
            setAllFreelancers={setAllFreelancers}
          />
        );
      case 'select-freelancers':
        return (
          <SelectFreelancers
            setTemplate={setTemplate}
            allFreelancers={allFreelancers}
            freelancersToSendOpportunityTo={freelancersToSendOpportunityTo}
            setFreelancersToSendOpportunityTo={setFreelancersToSendOpportunityTo}
          />
        );
      case 'review':
        return (
          <Review
            client={client}
            setTemplate={setTemplate}
            newProject={newProject}
            isToAllFreelancers={isToAllFreelancers}
            freelancersToSendOpportunityTo={freelancersToSendOpportunityTo}
            allFreelancers={allFreelancers}
          />
        );
      default:
        return <Welcome setTemplate={setTemplate} />;
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>{renderTemplate()}</Box>
    </Box>
  );
}

export default NewProject;

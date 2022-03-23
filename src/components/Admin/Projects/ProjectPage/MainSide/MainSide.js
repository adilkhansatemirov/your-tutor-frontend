import { useState } from 'react';
import Box from '@material-ui/core/Box';
import ProjectBidsTable from './ProjectBidsTable/ProjectBidsTable';
import TimesheetsTable from './TimesheetsTable/TimesheetsTable';
import InvoicesTable from './InvoicesTable/InvoicesTable';
import StyledTab from 'components/Shared/Styled/Tabs/StyledTab';
import StyledTabs from 'components/Shared/Styled/Tabs/StyledTabs';
import TabPanel from 'components/Shared/Utils/TabPanel';
// import AssignFreelancer from './AssignFreelancer/AssignFreelancer';

function MainSide({
  project,
  fetchProject,
  // freelancersToSendOpportunityTo,
  // setFreelancersToSendOpportunityTo,
  // errors,
  // control,
}) {
  const [tabNumber, setTabNumber] = useState(0);

  const handleChange = (event, newValue) => {
    setTabNumber(newValue);
  };

  if (project.project_status === 'accepting_bids') {
    return (
      <Box style={{ width: '70%', marginRight: '26px' }}>
        <Box style={{ marginBottom: '15px' }}>
          <StyledTabs value={tabNumber} onChange={handleChange}>
            <StyledTab index={0} text="Bids" count={project.project_bids.length} />
          </StyledTabs>
        </Box>
        <TabPanel value={tabNumber} index={0}>
          <ProjectBidsTable project={project} fetchProject={fetchProject} />
        </TabPanel>
      </Box>
    );
  }

  // if (project.project_status === 'assigning_freelancer') {
  //   return (
  //     <Box style={{ width: '70%', marginRight: '26px' }}>
  //       <AssignFreelancer
  //         freelancersToSendOpportunityTo={freelancersToSendOpportunityTo}
  //         setFreelancersToSendOpportunityTo={setFreelancersToSendOpportunityTo}
  //         errors={errors}
  //         control={control}
  //       />
  //     </Box>
  //   );
  // }

  return (
    <Box style={{ width: '70%', marginRight: '26px' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" style={{ marginBottom: '15px' }}>
        <StyledTabs value={tabNumber} onChange={handleChange}>
          <StyledTab index={0} text="Invoices" count={project.invoices.length} />
          {project.client_type_of_billing !== 'custom_type' && (
            <StyledTab index={1} text="Timesheets" count={project.timesheets.length} />
          )}
        </StyledTabs>
      </Box>
      <TabPanel value={tabNumber} index={0}>
        <InvoicesTable project={project} />
      </TabPanel>
      <TabPanel value={tabNumber} index={1}>
        <TimesheetsTable project={project} />
      </TabPanel>
    </Box>
  );
}

export default MainSide;

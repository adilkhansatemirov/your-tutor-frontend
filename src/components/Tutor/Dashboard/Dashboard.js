import { useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { getProjects } from 'services/freelancer/projects';
import { getOpportunities } from 'services/freelancer/opportunities';
import { AuthContext } from 'context/authContext';
import { FreelancerContext } from 'context/freelancerContext';
import ViewMore from './ViewMore';
import OpportunityCard from '../Opportunity/OpportunityCard/OpportunityCard';
import ContractListItem from '../Contract/ContractCard/ContractCard';
import { SnackbarContext } from 'context/snackbarContext';
import PageHeader from 'components/Shared/UI/PageHeader';
import PlaceholderIcon from 'assets/icons/placeholder_icon.png';
import { useState } from 'react';
import PageLoader from 'components/Shared/Utils/PageLoader';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(true);
  const { opportunities, setOpportunities, contracts, setContracts } = useContext(FreelancerContext);

  const userId = user ? user.user.id : '';
  useEffect(() => {
    if (userId) {
      fetchOpportunities();
      getProjects(userId)
        .then((response) => {
          setContracts(response.data);
          setLoading(false);
        })
        .catch(() => {
          showSnackbar('Something went wrong', 'error');
        });
    }
    // eslint-disable-next-line
  }, [userId]);

  const fetchOpportunities = () => {
    getOpportunities()
      .then((response) => {
        setOpportunities(response.data.list);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
      });
  };

  if (loading) return <PageLoader />;

  if (opportunities.length === 0 && contracts.length === 0)
    return (
      <Box
        style={{ height: '100vh' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <img src={PlaceholderIcon} alt="placeholder-icon" style={{ marginBottom: '36px' }} />
        <StyledTypography
          style={{ marginBottom: '10px' }}
          fontSize="30px"
          fontFamily="Rubik"
          fontWeight="bold"
          align="center"
        >
          Hi {user.user.first_name.trim()},
          <br />
          Contracts you're actively working
          <br /> on will appear here.
        </StyledTypography>
        <StyledTypography fontSize="16px" fontFamily="Rubik" align="center">
          Now we are actively looking for contracts that will perfectly match your skills.
          <br /> As soon as we find your contacts, you will immediately receive a notification by
          <br /> email and in the new opportunities section.
        </StyledTypography>
      </Box>
    );

  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            New Opportunities
          </StyledTypography>
          <ViewMore link="/tutor/opportunities" list={opportunities} listName="opportunities" />
        </Box>
      </PageHeader>
      <Box>
        <Box display="flex" flexWrap="wrap">
          {opportunities.slice(0, 3).map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} fetchOpportunities={fetchOpportunities} />
          ))}
        </Box>
      </Box>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            My Contracts
          </StyledTypography>
          <ViewMore link="/tutor/contracts" list={contracts} listName="contracts" />
        </Box>
      </PageHeader>
      <Box>
        <Box display="flex" flexWrap="wrap">
          {contracts.slice(0, 3).map((contract) => (
            <ContractListItem key={contract.id} contract={contract} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;

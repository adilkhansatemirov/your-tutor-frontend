import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Table, TableBody, TableHead } from '@material-ui/core';
import { connectStripe } from 'services/freelancer/freelancers';
import { getProjects } from 'services/freelancer/projects';
import { AuthContext } from 'context/authContext';
import { SnackbarContext } from 'context/snackbarContext';
import PageHeader from 'components/Shared/UI/PageHeader';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { useState } from 'react';
import PageLoader from 'components/Shared/Utils/PageLoader';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import ProjectsListItem from '../ProjectsListItem/ProjectsListItem';
import PlaceholderIcon from 'assets/icons/placeholder_icon.png';

function ContractList() {
  const location = useLocation();

  const { showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (location.search) {
      connectStripe({ connect_stripe_data: { code: location.search.split('=')[1] } })
        .then(() => {
          showSnackbar('Payout information has beed added successfully', 'success');
          setUser({ ...user, freelancer_detail: { ...user.freelancer_detail, connected_account_id: true } });
        })
        .catch(() => {
          showSnackbar('Something went wrong', 'error');
        });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, []);

  const fetchProjects = () => {
    getProjects()
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  if (loading) return <PageLoader />;

  if (projects.length === 0)
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
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            My Contracts
          </StyledTypography>
        </Box>
      </PageHeader>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <Box display="flex" alignItems="center">
                Project
              </Box>
            </StyledTableCell>
            <StyledTableCell>Company</StyledTableCell>

            <StyledTableCell>
              <Box display="flex" alignItems="center">
                Type
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              <Box display="flex" alignItems="center">
                Amount
              </Box>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <ProjectsListItem key={project.id} project={project} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ContractList;

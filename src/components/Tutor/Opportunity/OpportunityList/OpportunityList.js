import { useState, useEffect, useContext } from 'react';
import { Box, TableHead, TableBody, Table, InputAdornment } from '@material-ui/core';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import { SnackbarContext } from 'context/snackbarContext';
import PageLoader from 'components/Shared/Utils/PageLoader';
import PageHeader from 'components/Shared/UI/PageHeader';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import OpportunityListItem from '../OpportunityListItem/OpportunityListItem';
import StatusCounter from '../../../Shared/UI/StatusCounter';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import FastIcon from 'components/Shared/Utils/FastIcon';
import { getOpportunities } from 'services/freelancer/opportunities';
import { AuthContext } from 'context/authContext';
import PlaceholderIcon from 'assets/icons/placeholder_icon.png';

function OpportunityList() {
  const { showSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [counters, setCounters] = useState(null);

  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    fetchOpportunities();
    // eslint-disable-next-line
  }, []);

  const fetchOpportunities = () => {
    getOpportunities(user.user.id)
      .then((response) => {
        setCounters(response.data.meta.counters);
        setOpportunities(response.data.list);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  if (loading) return <PageLoader />;

  if (opportunities.length === 0)
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
          Opportunities you're actively working
          <br /> on will appear here.
        </StyledTypography>
        <StyledTypography fontSize="16px" fontFamily="Rubik" align="center">
          Now we are actively looking for opportunities that will perfectly match your skills.
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
            New Opportunities
          </StyledTypography>
        </Box>
      </PageHeader>
      <Box display="flex" justifyContent="space-between" style={{ marginBottom: '27px' }}>
        <Box display="flex">
          <StatusCounter label="New" count={counters?.new_count} color="green" />
          <StatusCounter label="Applied" count={counters?.applied_count} color="orange" />
          <StatusCounter label="Awarded" count={counters?.awarded_count} color="green" />
          <StatusCounter label="Rejected" count={counters?.rejected_count} color="tomatoRed" />
        </Box>
        <Box>
          <StyledTextField
            placeholder="Search projects..."
            // onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FastIcon width="17" height="18" iconName="search" />
                </InputAdornment>
              ),
            }}
            small
            fontFamily="Poppins"
          />
        </Box>
      </Box>
      <Table>
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <Box display="flex" alignItems="center">
                Project
              </Box>
            </StyledTableCell>
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
            <StyledTableCell>Status</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {opportunities.map((opportunity) => (
            <OpportunityListItem
              key={opportunity.id}
              opportunity={opportunity}
              fetchOpportunities={fetchOpportunities}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default OpportunityList;

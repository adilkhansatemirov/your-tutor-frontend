import { useState, useEffect, useContext } from 'react';
import { Box, TableHead, TableBody, Table, InputAdornment, FormControl, MenuItem } from '@material-ui/core';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import FreelancerListItem from '../FreelancerListItem/FreelancerListItem';
// import { getFreelancers } from 'services 'services/admin/freelancers';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
// import { SnackbarContext } from 'context/snackbarContext';
import PageHeader from 'components/Shared/UI/PageHeader';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
// import FastIcon from 'components/Shared/Utils/FastIcon';
import StatusCounter from 'components/Shared/UI/StatusCounter';
import PageLoader from 'components/Shared/Utils/PageLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import StyledSelect from 'components/Shared/Styled/StyledSelect';
import TableCellSortArrows from 'components/Shared/Utils/TableCellSortArrows';
// import { useFilter, usePagination, useSearch, useSort } from 'hooks';
import axios from 'axios';

function FreelancerList() {
  // const { // showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(true);
  const [counters, setCounters] = useState(null);
  const [pagination, setPagination] = useState(null);

  const [freelancers, setFreelancers] = useState([]);

  const [params, setParams] = useState({ page: 1, sort_key: null, sort_direction: null });

  useEffect(() => {
    fetchFreelancers(params);
    // eslint-disable-next-line
  }, []);

  const fetchFreelancers = (params, cancelToken) => {
    // getFreelancers(params, cancelToken)
    //   .then((response) => {
    //     setCounters(response.data.meta.counters);
    //     setPagination(response.data.meta.pagination);
    //     setFreelancers(response.data.list);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     if (axios.isCancel(error)) {
    //       console.log('Operation canceled due to new request');
    //     } else {
    //       // showSnackbar('Something went wrong', 'error');
    //     }
    //     setLoading(false);
    //   });
  };

  // const fetchMore = usePagination({
  //   pagination,
  //   setPagination,
  //   params,
  //   setParams,
  //   data: freelancers,
  //   getData: getFreelancers,
  //   setData: setFreelancers,
  //   setLoading,
  //   setCounters,
  // });

  // const handleSearch = useSearch({
  //   params,
  //   setParams,
  //   setLoading,
  //   fetchData: fetchFreelancers,
  // });

  // const { filterValue, handleFilterChange } = useFilter({
  //   params,
  //   setParams,
  //   fetchData: fetchFreelancers,
  //   filterBy: 'profile_status',
  // });

  // const handleChangeSortParams = useSort({ params, setParams, fetchData: fetchFreelancers });

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Roboto" fontWeight="bold" fontSize={20}>
          </StyledTypography>
        </Box>
      </PageHeader>
      {/* <Box display="flex" alignItems="center" justifyContent="space-between" style={{ marginBottom: '27px' }}>
        <Box display="flex">
          <StatusCounter label="Billing" count={counters?.billing_count} color="green" />
          <StatusCounter label="Pending Approval" count={counters?.pending_approval_count} color="orange" />
          <StatusCounter label="Approved" count={counters?.approved_count} color="green" />
          <StatusCounter label="Blocked" count={counters?.blocked_count} color="tomatoRed" />
        </Box>
        <Box>
          <StyledTextField
            small
            placeholder="Search freelancers..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FastIcon width="17" height="18" iconName="search" />
                </InputAdornment>
              ),
            }}
            fontFamily="Poppins"
          />
          <FormControl variant="outlined">
            <StyledSelect
              placeholder="Filter by"
              onChange={handleFilterChange}
              value={filterValue}
              style={{ marginLeft: '30px', width: '250px' }}
              small
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="billing">Billing</MenuItem>
              <MenuItem value="pending_approval">Pending approval</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
            </StyledSelect>
          </FormControl>
        </Box>
      </Box>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <InfiniteScroll
            dataLength={freelancers.length}
            next={fetchMore}
            hasMore={pagination.page < pagination.num_pages}
            loader={
              <StyledTypography align="center" style={{ margin: '20px 0', opacity: 0.5 }}>
                Loading..
              </StyledTypography>
            }
            endMessage={
              <StyledTypography align="center" style={{ margin: '20px 0', opacity: 0.5 }}>
                The end of the list
              </StyledTypography>
            }
          >
            <Table>
              <colgroup>
                <col style={{ width: '35%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell onClick={() => handleChangeSortParams('users_freelancer_details.first_name')}>
                    <Box display="flex" alignItems="center">
                      Freelancer
                      <TableCellSortArrows
                        sortKey="users_freelancer_details.first_name"
                        currentSortKey={params.sort_key}
                        currentSortDirection={params.sort_direction}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Specialization</StyledTableCell>
                  <StyledTableCell>Sign Up Date</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {freelancers.map((freelancer) => (
                  <FreelancerListItem
                    key={freelancer.user.id}
                    freelancer={freelancer}
                    fetchFreelancers={fetchFreelancers}
                  />
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </>
      )} */}
    </>
  );
}

export default FreelancerList;

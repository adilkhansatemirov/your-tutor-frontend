import { useState, useEffect, useContext } from 'react';
import { Box, TableHead, TableBody, Table, InputAdornment, FormControl, MenuItem } from '@material-ui/core';
import TableCellSortArrows from 'components/Shared/Utils/TableCellSortArrows';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import ClientListItem from '../ClientListItem/ClientListItem';
import NewClientModal from '../NewClientModal/NewClientModal';
import { SnackbarContext } from 'context/snackbarContext';
import PageHeader from 'components/Shared/UI/PageHeader';
import StatusCounter from 'components/Shared/UI/StatusCounter';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import FastIcon from 'components/Shared/Utils/FastIcon';
import { getClients } from 'services/admin/clients';
import PageLoader from 'components/Shared/Utils/PageLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import StyledSelect from 'components/Shared/Styled/StyledSelect';
import { useFilter, usePagination, useSearch, useSort } from 'hooks';
import axios from 'axios';

function ClientList() {
  const { showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(true);
  const [counters, setCounters] = useState(null);

  const [pagination, setPagination] = useState(null);
  const [params, setParams] = useState({ page: 1, sort_key: null, sort_direction: null });

  const [clients, setClients] = useState([]);

  const [newClientModalIsOpen, setNewClientModalIsOpen] = useState(false);

  const handleOpenNewClientModal = () => {
    setNewClientModalIsOpen(true);
  };
  const handleCloseNewClientModal = () => {
    setNewClientModalIsOpen(false);
  };

  useEffect(() => {
    fetchClients(params);
    // eslint-disable-next-line
  }, []);

  const fetchClients = (params, cancelToken) => {
    getClients(params, cancelToken)
      .then((response) => {
        setCounters(response.data.meta.counters);
        setPagination(response.data.meta.pagination);
        setClients(response.data.list);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Operation canceled due to new request');
        } else {
          // showSnackbar('Something went wrong', 'error');
        }
        setLoading(false);
      });
  };

  const fetchMore = usePagination({
    pagination,
    setPagination,
    params,
    setParams,
    data: clients,
    getData: getClients,
    setData: setClients,
    setLoading,
    setCounters,
  });

  const handleSearch = useSearch({
    params,
    setParams,
    setLoading,
    fetchData: fetchClients,
  });

  const { filterValue, handleFilterChange } = useFilter({
    params,
    setParams,
    fetchData: fetchClients,
    filterBy: 'profile_status',
  });

  const handleChangeSortParams = useSort({ params, setParams, fetchData: fetchClients });

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            Students
          </StyledTypography>
          <StyledButton size="small" textTransform="uppercase" variant="light-blue" onClick={handleOpenNewClientModal}>
            Add student
          </StyledButton>
        </Box>
      </PageHeader>

      <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: '27px' }}>
        <Box display="flex">
          <StatusCounter label="Complete" count={counters?.complete_count} color="green" />
          <StatusCounter label="Incomplete" count={counters?.incomplete_count} color="tomatoRed" />
          <StatusCounter label="Blocked" count={counters?.blocked_count} color="tomatoRed" />
        </Box>
        <Box>
          <StyledTextField
            small
            placeholder="Search students..."
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
              <MenuItem value="complete">Complete</MenuItem>
              <MenuItem value="incomplete">Incomplete</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
            </StyledSelect>
          </FormControl>
        </Box>
      </Box>
      {loading ? (
        <PageLoader />
      ) : (
        <InfiniteScroll
          dataLength={clients.length}
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
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell sortDirection="asc" onClick={() => handleChangeSortParams('users.first_name')}>
                  <Box display="flex" alignItems="center">
                    Student
                    <TableCellSortArrows
                      sortKey="users.first_name"
                      currentSortKey={params.sort_key}
                      currentSortDirection={params.sort_direction}
                    />
                  </Box>
                </StyledTableCell>
                <StyledTableCell onClick={() => handleChangeSortParams('student_details.company_name')}>
                  <Box display="flex" alignItems="center">
                    Company
                    <TableCellSortArrows
                      sortKey="student_details.company_name"
                      currentSortKey={params.sort_key}
                      currentSortDirection={params.sort_direction}
                    />
                  </Box>
                </StyledTableCell>
                <StyledTableCell>Profile Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <ClientListItem key={client.id} client={client} fetchClients={fetchClients} />
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      )}
      <NewClientModal open={newClientModalIsOpen} onClose={handleCloseNewClientModal} fetchClients={fetchClients} />
    </>
  );
}

export default ClientList;

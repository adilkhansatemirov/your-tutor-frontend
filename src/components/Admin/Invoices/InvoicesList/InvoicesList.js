import { useState, useEffect, useContext } from 'react';
import { Box, TableHead, TableBody, Table, InputAdornment, FormControl, MenuItem } from '@material-ui/core';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InvoicesListItem from '../InvoicesListItem/InvoicesListItem';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import { SnackbarContext } from 'context/snackbarContext';
import PageHeader from 'components/Shared/UI/PageHeader';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import FastIcon from 'components/Shared/Utils/FastIcon';
import StatusCounter from 'components/Shared/UI/StatusCounter';
import PageLoader from 'components/Shared/Utils/PageLoader';
import { getInvoices } from 'services/admin/invoices';
import StyledSelect from 'components/Shared/Styled/StyledSelect';
import InfiniteScroll from 'react-infinite-scroll-component';
import TableCellSortArrows from 'components/Shared/Utils/TableCellSortArrows';
import { useFilter, useSearch, useSort, usePagination } from 'hooks';
import axios from 'axios';

function InvoicesList() {
  const { showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(true);
  const [counters, setCounters] = useState(null);
  const [pagination, setPagination] = useState(null);

  const [invoices, setInvoices] = useState([]);

  const [params, setParams] = useState({ page: 1 });

  useEffect(() => {
    fetchInvoices(params);
    // eslint-disable-next-line
  }, []);

  const fetchInvoices = (params, cancelToken) => {
    getInvoices(params, cancelToken)
      .then((response) => {
        setCounters(response.data.meta.counters);
        setPagination(response.data.meta.pagination);
        setInvoices(response.data.list);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Operation canceled due to new request');
        } else {
          showSnackbar('Something went wrong', 'error');
        }
        setLoading(false);
      });
  };

  const fetchMore = usePagination({
    pagination,
    setPagination,
    params,
    setParams,
    data: invoices,
    getData: getInvoices,
    setData: setInvoices,
    setLoading,
    setCounters,
  });

  const handleSearch = useSearch({
    params,
    setParams,
    setLoading,
    fetchData: fetchInvoices,
  });

  const { filterValue, handleFilterChange } = useFilter({
    params,
    setParams,
    fetchData: fetchInvoices,
    filterBy: 'invoice_status',
  });

  const handleChangeSortParams = useSort({ params, setParams, fetchData: fetchInvoices });

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            Invoices
          </StyledTypography>
          <StyledTextField
            small
            placeholder="Search invoices..."
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
        </Box>
      </PageHeader>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" style={{ marginBottom: '27px' }}>
            <Box display="flex">
              <StatusCounter label="Sent" count={counters.sent_count} color="orange" />
              <StatusCounter label="Draft" count={counters.draft_count} color="orange" />
              <StatusCounter label="Paid" count={counters.paid_count} color="green" />
              <StatusCounter label="Error" count={counters.error_count} color="tomatoRed" />
            </Box>
            <Box display="flex">
              <FormControl variant="outlined">
                <StyledSelect
                  placeholder="Filter by"
                  onChange={handleFilterChange}
                  value={filterValue}
                  style={{ marginLeft: '30px', width: '250px' }}
                  small
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="sent">Sent</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="erro">Error</MenuItem>
                </StyledSelect>
              </FormControl>
            </Box>
          </Box>

          <InfiniteScroll
            dataLength={invoices.length}
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
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell onClick={() => handleChangeSortParams('invoices.invoice_date')}>
                    <Box display="flex" alignItems="center">
                      Invoice Date
                      <TableCellSortArrows
                        sortKey="invoices.invoice_date"
                        currentSortKey={params.sort_key}
                        currentSortDirection={params.sort_direction}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleChangeSortParams('clients.first_name')}>
                    <Box display="flex" alignItems="center">
                      Client
                      <TableCellSortArrows
                        sortKey="clients.first_name"
                        currentSortKey={params.sort_key}
                        currentSortDirection={params.sort_direction}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleChangeSortParams('freelancers.first_name')}>
                    <Box display="flex" alignItems="center">
                      Freelancer
                      <TableCellSortArrows
                        sortKey="freelancers.first_name"
                        currentSortKey={params.sort_key}
                        currentSortDirection={params.sort_direction}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleChangeSortParams('projects.title')}>
                    <Box display="flex" alignItems="center">
                      Project
                      <TableCellSortArrows
                        sortKey="projects.title"
                        currentSortKey={params.sort_key}
                        currentSortDirection={params.sort_direction}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>Invoice Amount</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <InvoicesListItem key={invoice.id} invoice={invoice} fetchInvoices={fetchInvoices} />
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </>
      )}
    </>
  );
}

export default InvoicesList;

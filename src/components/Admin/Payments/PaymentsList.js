import { useState, useEffect, useContext } from 'react';
import { Box, TableHead, TableBody, Table, InputAdornment } from '@material-ui/core';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import PaymentsListItem from './PaymentsListItem';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
// import { SnackbarContext } from 'context/snackbarContext';
import PageHeader from 'components/Shared/UI/PageHeader';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import FastIcon from 'components/Shared/Utils/FastIcon';
import StatusCounter from 'components/Shared/UI/StatusCounter';
import PageLoader from 'components/Shared/Utils/PageLoader';
// import { getPayments } from 'services 'services/admin/payments';
import InfiniteScroll from 'react-infinite-scroll-component';
import NumberFormat from 'react-number-format';
import TableCellSortArrows from 'components/Shared/Utils/TableCellSortArrows';
// import { useSort, useSearch } from 'hooks';
import axios from 'axios';

function PaymentsList() {
  // const { // showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [pagination, setPagination] = useState(null);

  const [payments, setPayments] = useState([]);

  const [params, setParams] = useState({ page: 1, sort_key: null, sort_direction: null });

  useEffect(() => {
    fetchPayments(params);
    // eslint-disable-next-line
  }, []);

  const fetchPayments = (params, cancelToken) => {
    // getPayments(params, cancelToken)
    //   .then((response) => {
    //     setBalance(response.data.meta.balance);
    //     setPagination(response.data.meta.pagination);
    //     setPayments(response.data.list);
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

  const fetchMore = () => {
    const newParams = { ...params, page: pagination.page + 1 };
    setParams(newParams);
    // getPayments(newParams)
    //   .then((response) => {
    //     setBalance(response.data.meta.balance);
    //     setPagination(response.data.meta.pagination);
    //     setPayments([...payments, ...response.data.list]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     // showSnackbar('Something went wrong', 'error');
    //     setLoading(false);
    //   });
  };

  // const handleSearch = useSearch({
  //   params,
  //   setParams,
  //   setLoading,
  //   fetchData: fetchPayments,
  // });

  // const handleChangeSortParams = useSort({ params, setParams, fetchData: fetchPayments });

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Roboto" fontWeight="bold" fontSize={20}>
            TIMESHEETS
          </StyledTypography>
          <StyledTextField
            small
            placeholder="Search timesheets..."
            // onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FastIcon width="17" height="18" iconName="search" />
                </InputAdornment>
              ),
            }}
            fontFamily="Roboco"
          />
        </Box>
      </PageHeader>
      {/* {loading ? (
        <PageLoader />
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" style={{ marginBottom: '27px' }}>
            <Box display="flex">
              <StatusCounter
                label="InHomeAccountants Balance"
                count={
                  <NumberFormat
                    prefix="$"
                    value={Number(balance)}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    displayType="text"
                    thousandSeparator={true}
                  />
                }
                color="green"
              />
            </Box>
          </Box>

          <InfiniteScroll
            dataLength={payments.length}
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
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell onClick={() => handleChangeSortParams('payments.net_amount')}>
                    <Box display="flex" alignItems="center">
                      Net Amount
                      <TableCellSortArrows
                        sortKey="payments.net_amount"
                        currentSortKey={params.sort_key}
                        currentSortDirection={params.sort_direction}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleChangeSortParams('payments.full_amount')}>
                    <Box display="flex" alignItems="center">
                      Full Amount
                      <TableCellSortArrows
                        sortKey="payments.full_amount"
                        currentSortKey={params.sort_key}
                        currentSortDirection={params.sort_direction}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleChangeSortParams('payments.stripe_fee')}>
                    <Box display="flex" alignItems="center">
                      Stripe Fee
                      <TableCellSortArrows
                        sortKey="payments.stripe_fee"
                        currentSortKey={params.sort_key}
                        currentSortDirection={params.sort_direction}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleChangeSortParams('payments.updated_at')}>
                    <Box display="flex" alignItems="center">
                      Date
                      <TableCellSortArrows
                        sortKey="payments.updated_at"
                        currentSortKey={params.sort_key}
                        currentSortDirection={params.sort_direction}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <PaymentsListItem key={payment.id} payment={payment} />
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </>
      )} */}
    </>
  );
}

export default PaymentsList;

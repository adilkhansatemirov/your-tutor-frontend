import { Box, Table, TableBody, TableHead } from '@material-ui/core';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import PageHeader from 'components/Shared/UI/PageHeader';
import StatusCounter from 'components/Shared/UI/StatusCounter';
import PageLoader from 'components/Shared/Utils/PageLoader';
import TableCellSortArrows from 'components/Shared/Utils/TableCellSortArrows';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useEffect, useState } from 'react';
import { getInvoices } from 'services/client/invoices';
import InvoiceListItem from '../InvoiceListItem/InvoiceListItem';

export default function Invoices() {
  const { showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({});
  const [invoices, setInvoices] = useState([]);

  const [params, setParams] = useState({ page: 1 });

  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line
  }, []);

  const fetchInvoices = (params) => {
    getInvoices(params)
      .then((response) => {
        setMeta(response.data.meta);
        setInvoices(response.data.list);
        setLoading(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setLoading(false);
      });
  };

  const handleChangeSortParams = (sort_key) => {
    let newParams = null;
    if (sort_key !== params.sort_key) {
      newParams = { ...params, sort_key, sort_direction: 'asc', page: 1 };
      setParams(newParams);
      fetchInvoices(newParams);
      return;
    }

    if (params.sort_direction === 'asc') {
      newParams = { ...params, sort_key, sort_direction: 'desc', page: 1 };
    } else if (params.sort_direction === 'desc') {
      showSnackbar('Default sort by date applied', 'info');
      newParams = { ...params, sort_key: null, sort_direction: null, page: 1 };
    }
    setParams(newParams);
    fetchInvoices(newParams);
  };

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            Invoices
          </StyledTypography>
        </Box>
      </PageHeader>
      <Box display="flex" style={{ marginBottom: '27px' }}>
        <StatusCounter label="Open" count={meta.open_count} color="orange" />
        <StatusCounter label="Paid" count={meta.paid_count} color="green" />
      </Box>
      {loading ? (
        <PageLoader />
      ) : (
        <Table>
          <TableHead>
            <StyledTableRow>
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
              <StyledTableCell onClick={() => handleChangeSortParams('users.first_name')}>
                <Box display="flex" alignItems="center">
                  Freelancer
                  <TableCellSortArrows
                    sortKey="users.first_name"
                    currentSortKey={params.sort_key}
                    currentSortDirection={params.sort_direction}
                  />
                </Box>
              </StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <InvoiceListItem key={invoice.id} invoice={invoice} fetchInvoices={fetchInvoices} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

import { Box, Table, TableBody, TableHead } from '@material-ui/core';
import TabPanel from 'components/Shared/Utils/TabPanel';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTab from 'components/Shared/Styled/Tabs/StyledTab';
import StyledTabs from 'components/Shared/Styled/Tabs/StyledTabs';
import React, { useState } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import Status from 'components/Shared/UI/Status/Status';
import { capitalize, removeUnderscores } from 'utils/common';
import { Link } from 'react-router-dom';

function MainSide({ project }) {
  const [tabNumber, setTabNumber] = useState(0);

  const handleChange = (event, newValue) => {
    setTabNumber(newValue);
  };

  const getColor = (invoice) => {
    switch (invoice.invoice_status) {
      case 'sent':
        return 'orange';
      case 'paid':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'red';
    }
  };

  const getText = (invoice) => {
    if (invoice.invoice_status === 'sent') {
      return 'Open';
    }
    return capitalize(removeUnderscores(invoice.invoice_status));
  };

  const invoiceStatus = (invoice) => ({
    color: getColor(invoice),
    text: getText(invoice),
    complete: true,
  });

  if (project.project_status === 'accepting_bids' || project.project_status === 'assigning_freelancer') {
    return (
      <Box style={{ width: '70%', marginRight: '26px' }}>
        <StyledTypography fontSize="16px">Freelancer for this project is being assigned</StyledTypography>
      </Box>
    );
  }

  return (
    <Box style={{ width: '70%', marginRight: '26px' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" style={{ marginBottom: '15px' }}>
        <StyledTabs value={tabNumber} onChange={handleChange}>
          <StyledTab index={0} text="Invoices" count={project.invoices.length} />
        </StyledTabs>
      </Box>
      <TabPanel value={tabNumber} index={0}>
        <Table>
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Invoice Date</StyledTableCell>
              <StyledTableCell>Invoice Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {project.invoices.map((invoice) => (
              <StyledTableRow key={invoice.id}>
                <StyledTableCell>
                  <Link to={`/student/invoices/${invoice.id}`} style={{ textDecoration: 'none' }}>
                    <StyledTypography fontWeight="bold" color="skyBlue">
                      {moment(invoice.invoice_date).format('MMMM DD, YYYY')}
                    </StyledTypography>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTypography fontSize="12px">
                    <NumberFormat
                      prefix="$"
                      value={Number(invoice.invoice_amount)}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  </StyledTypography>
                </StyledTableCell>
                <StyledTableCell>
                  <Status
                    complete={invoiceStatus(invoice).complete}
                    color={invoiceStatus(invoice).color}
                    text={invoiceStatus(invoice).text}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TabPanel>
    </Box>
  );
}

export default MainSide;

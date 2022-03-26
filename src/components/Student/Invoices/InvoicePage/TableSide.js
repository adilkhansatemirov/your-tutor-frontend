import { Table, TableHead, TableRow, TableBody, Box } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import { round } from 'utils/common';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';

function TableSide({ invoice }) {
  return (
    <>
      <Box display="flex" flexDirection="column" style={{ width: '70%', marginRight: '26px' }}>
        <form>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Item</StyledTableCell>
                <StyledTableCell>Hours</StyledTableCell>
                <StyledTableCell>Hourly Rate</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
                {invoice.invoice_status === 'draft' && <StyledTableCell></StyledTableCell>}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {invoice.invoice_items.map((item) => (
                <TableRow key={item.id}>
                  <StyledTableCell>
                    <StyledTypography fontWeight="bold" fontSize={14} type="h6">
                      {item.item}
                    </StyledTypography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledTypography fontSize={14} type="h6">
                      {item.qty}
                    </StyledTypography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledTypography fontSize={14} type="h6">
                      <NumberFormat
                        prefix="$"
                        value={Number(item.price)}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType="text"
                        thousandSeparator={true}
                      />
                    </StyledTypography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledTypography fontWeight="bold" fontSize={14} type="h6">
                      <NumberFormat
                        prefix="$"
                        value={round(item.price * item.qty)}
                        displayType="text"
                        decimalScale={2}
                        fixedDecimalScale={true}
                        thousandSeparator={true}
                      />
                    </StyledTypography>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </Box>
    </>
  );
}

export default TableSide;

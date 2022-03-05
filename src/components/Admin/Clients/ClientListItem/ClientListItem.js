import StyledTypography from 'components/Shared/Styled/StyledTypography';
// import ClientActions from './ClientActions/ClientActions';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import Status from 'components/Shared/UI/Status/Status';

function ClientListItem({ client, fetchClients }) {
  const getColor = () => {
    switch (client.profile_status) {
      case 'complete':
        return 'green';
      case 'incomplete':
        return 'red';
      case 'blocked':
        return 'red';
      default:
        return 'red';
    }
  };

  const getText = () => {
    switch (client.profile_status) {
      case 'complete':
        return 'Complete';
      case 'incomplete':
        return 'Incomplete';
      case 'blocked':
        return 'Blocked';
      default:
        return '';
    }
  };

  const getComplete = () => {
    switch (client.profile_status) {
      case 'complete':
        return true;
      case 'incomplete':
        return false;
      case 'blocked':
        return true;
      default:
        return false;
    }
  };

  const clientStatus = {
    color: getColor(),
    text: getText(),
    complete: getComplete(),
  };

  return (
    <StyledTableRow>
      <StyledTableCell>
        <StyledTypography fontSize={12} fontWeight="bold">
          {`${client.user.first_name} ${client.user.last_name}`}
        </StyledTypography>
        <StyledTypography fontSize={12}>{client.user.email}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledTypography fontSize={12}>{client.company_name}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell>
        <Status complete={clientStatus.complete} color={clientStatus.color} text={clientStatus.text} />
      </StyledTableCell>
      <StyledTableCell>
        {/* <ClientActions client={client} fetchClients={fetchClients} /> */}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default ClientListItem;

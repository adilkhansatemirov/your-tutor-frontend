import { useState, useContext } from 'react';
import { Box, TableContainer, Table, TableHead, TableBody, Paper } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledButton from 'components/Shared/Styled/StyledButton';
import { SnackbarContext } from 'context/snackbarContext';
import { filterFreelancerOptions } from 'utils/contracts';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import theme from 'theme';

function FreelancersToSendOpportuniyTo({
  freelancers,
  freelancersToSendOpportunityTo,
  setFreelancersToSendOpportunityTo,
}) {

  const { showSnackbar } = useContext(SnackbarContext);
  const [freelancerInput, setFreelancerInput] = useState('');

  const handleChangeFreelancerAutocomplete = (event, value, reason) => {
    const alreadyInList = Boolean(freelancersToSendOpportunityTo.find((freelancer) => freelancer.id === value.id));
    if (alreadyInList) {
      showSnackbar('This freelancer is already in list', 'info');
    }
    if (reason === 'select-option' && alreadyInList === false) {
      setFreelancersToSendOpportunityTo([...freelancersToSendOpportunityTo, value]);
    }
    setFreelancerInput('');
  };

  const handleRemoveFreelancer = (freelancerId) => {
    const updatedFreelancersList = [...freelancersToSendOpportunityTo].filter(
      (freelancer) => freelancer.id !== freelancerId,
    );
    setFreelancersToSendOpportunityTo(updatedFreelancersList);
  };

  return (
    <Box>
      <Autocomplete
        options={freelancers}
        style={{ marginTop: '10px' }}
        getOptionLabel={(option) => option.user.email}
        label="Enter name or email"
        filterOptions={filterFreelancerOptions}
        value={null}
        onChange={handleChangeFreelancerAutocomplete}
        inputValue={freelancerInput}
        onInputChange={(event, value) => setFreelancerInput(value)}
        renderOption={(option) => (
          <Box>
            <StyledTypography fontWeight="bold">{option.user.first_name} {option.user.last_name}</StyledTypography>
            <StyledTypography>{option.user.email}</StyledTypography>
          </Box>
        )}
        renderInput={(params) => <StyledTextField placeholder="Enter name or email" variant="outlined" {...params} />}
      />
      <TableContainer style={{ marginTop: '10px' }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Freelancer</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {freelancersToSendOpportunityTo.map((freelancer) => (
              <StyledTableRow key={freelancer.id}>
                <StyledTableCell component="th" scope="row">
                  <StyledTypography fontWeight="bold">{freelancer.user.first_name} {freelancer.user.last_name}</StyledTypography>
                  <StyledTypography>{freelancer.user.email}</StyledTypography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <StyledButton
                    color={theme.palette.tomatoRed.main}
                    onClick={() => handleRemoveFreelancer(freelancer.id)}
                    variant="text"
                  >
                    Remove
                  </StyledButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default FreelancersToSendOpportuniyTo;

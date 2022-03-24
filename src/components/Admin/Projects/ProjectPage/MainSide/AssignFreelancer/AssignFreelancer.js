import { Box, Paper, Table, TableBody, TableContainer, TableHead } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { SnackbarContext } from 'context/snackbarContext';
import React, { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { getAllFreelancers } from 'services/admin/freelancers';
import theme from 'theme';
import { filterFreelancerOptions } from 'utils/contracts';
import dollarIcon from 'assets/icons/dollar-black.svg';

function AssignFreelancer({
  freelancersToSendOpportunityTo,
  setFreelancersToSendOpportunityTo,
  errors,
  control,
}) {
  const { showSnackbar } = useContext(SnackbarContext);

  const [freelancerInput, setFreelancerInput] = useState('');
  const [allFreelancers, setAllFreelancers] = useState([]);

  useEffect(() => {
    getAllFreelancers()
      .then((response) => {
        setAllFreelancers(response.data);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
      });
    // eslint-disable-next-line
  }, []);

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
      <StyledTypography fontSize="16px">
        How much are we paying the freelancer?
      </StyledTypography>
      <Box display="flex" alignItems="flex-start" style={{ marginTop: '15px' }}>
        <img style={{ marginTop: '15px' }} src={dollarIcon} alt="dollar" />
        <Controller
          as={<StyledTextField placeholder="Amount" />}
          name="tutor_payment_amount"
          control={control}
          type="number"
          error={Boolean(errors.tutor_payment_amount)}
          helperText={errors.tutor_payment_amount && errors.tutor_payment_amount.message}
          style={{ width: '100px', marginBottom: '20px', marginLeft: '5px' }}
        />
      </Box>
      <StyledTypography fontFamily="Rubik" fontSize="16px" style={{ marginBottom: '23px' }}>
        Select single freelancer to start project, select multiple to start bids
      </StyledTypography>
      <Autocomplete
        options={allFreelancers}
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
            <StyledTypography fontWeight="bold">
              {option.user.first_name} {option.user.last_name}
            </StyledTypography>
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
                  <StyledTypography fontWeight="bold">
                    {freelancer.user.first_name} {freelancer.user.last_name}
                  </StyledTypography>
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

export default AssignFreelancer;

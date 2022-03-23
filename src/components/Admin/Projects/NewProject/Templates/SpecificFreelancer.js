import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, RadioGroup } from '@material-ui/core';
import StyledRadio from 'components/Shared/Styled/Radio/StyledRadio';
import StyledRadioFormControlLabel from 'components/Shared/Styled/Radio/StyledRadioFormControlLabel';
import StyledButton from 'components/Shared/Styled/StyledButton';
import theme from 'theme';
import StepDescription from '../StepDescription';
import StepNumber from '../StepNumber';
import StepTitle from '../StepTitle';
import { getAllFreelancers } from 'services/admin/freelancers';
import { SnackbarContext } from 'context/snackbarContext';
import previousIcon from 'assets/icons/arrow-left-gray.svg';

function SpecificFreelancer({ setTemplate, isToAllFreelancers, setIsToAllFreelancers, setAllFreelancers }) {
  const { showSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(true);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      specific_freelancer: isToAllFreelancers ? 'no' : 'yes',
    },
  });

  useEffect(() => {
    getAllFreelancers()
      .then((response) => {
        setAllFreelancers(response.data);
        setLoading(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
      });
    // eslint-disable-next-line
  }, []);

  const onSubmit = (values) => {
    if (values.specific_freelancer === 'no') {
      setIsToAllFreelancers(true);
      setTemplate('review');
    } else {
      setIsToAllFreelancers(false);
      setTemplate('select-freelancers');
    }
  };

  return (
    <>
      <StepNumber stepNumber={4} />
      <StepTitle text="Freelancers." />
      <StepDescription text="Do you have someone specific in mind who should work on the project?" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={
            <RadioGroup style={{ flexDirection: 'row', marginBottom: '10px' }}>
              <StyledRadioFormControlLabel value="yes" control={<StyledRadio />} label="Yes" />
              <StyledRadioFormControlLabel value="no" control={<StyledRadio />} label="No" />
            </RadioGroup>
          }
          name="specific_freelancer"
          control={control}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledButton disabled={loading} textTransform="uppercase" variant="light-blue" type="submit">
            Next
          </StyledButton>
          <StyledButton
            fontWeight="normal"
            variant="text"
            size="small"
            type="button"
            onClick={() => setTemplate('freelancer-payment-amount')}
            color={theme.palette.textGray}
          >
            <img src={previousIcon} alt="arrow left" style={{ marginRight: '8px' }} /> Previous step
          </StyledButton>
        </Box>
      </form>
    </>
  );
}

export default SpecificFreelancer;

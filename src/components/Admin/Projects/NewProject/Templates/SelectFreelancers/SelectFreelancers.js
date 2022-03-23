import StepDescription from '../../StepDescription';
import StepNumber from '../../StepNumber';
import StepTitle from '../../StepTitle';
import FreelancersToSendOpportuniyTo from './FreelancersToSendOpportunityTo';
import { Box } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import theme from 'theme';
import previousIcon from 'assets/icons/arrow-left-gray.svg';

function SelectFreelancers({
  setTemplate,
  allFreelancers,
  freelancersToSendOpportunityTo,
  setFreelancersToSendOpportunityTo,
}) {
  return (
    <>
      <StepNumber stepNumber={4} />
      <StepTitle text="Freelancers" />
      <StepDescription text="Please use the form below to select all freelancers who will be invited to bid on this project:" />
      <FreelancersToSendOpportuniyTo
        freelancers={allFreelancers}
        freelancersToSendOpportunityTo={freelancersToSendOpportunityTo}
        setFreelancersToSendOpportunityTo={setFreelancersToSendOpportunityTo}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: '20px' }}>
        <StyledButton
          disabled={freelancersToSendOpportunityTo.length === 0}
          onClick={() => setTemplate('review')}
          textTransform="uppercase"
          variant="light-blue"
          type="button"
        >
          Next
        </StyledButton>
        <StyledButton
          fontWeight="normal"
          variant="text"
          size="small"
          type="button"
          onClick={() => setTemplate('specific-freelancer')}
          color={theme.palette.textGray}
        >
          <img src={previousIcon} alt="arrow left" style={{ marginRight: '8px' }} /> Previous step
        </StyledButton>
      </Box>
    </>
  );
}

export default SelectFreelancers;

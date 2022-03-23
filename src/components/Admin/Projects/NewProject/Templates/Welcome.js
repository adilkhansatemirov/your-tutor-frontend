import StyledButton from 'components/Shared/Styled/StyledButton';
import StepDescription from '../StepDescription';
import StepTitle from '../StepTitle';

function Welcome({ setTemplate }) {
  return (
    <>
      <StepTitle text="Welcome to Project Creation." />
      <StepDescription text="This wizard will guide you through the steps of creating a new project and assigning them to freelancers." />
      <StyledButton
        textTransform="uppercase"
        variant="light-blue"
        onClick={() => setTemplate('client')}
      >
        Begin
      </StyledButton>
    </>
  );
}

export default Welcome;

import StyledButton from 'components/Shared/Styled/StyledButton';
import StepDescription from '../StepDescription';
import StepTitle from '../StepTitle';

function Welcome({ setTemplate }) {
  return (
    <>
      <StepTitle text="Welcome to Lesson Creation." />
      <StepDescription text="This wizard will guide you through the steps of creating a new project and assigning them to tutors." />
      <StyledButton
        variant="dark-blue"
        onClick={() => setTemplate('client')}
      >
        Begin
      </StyledButton>
    </>
  );
}

export default Welcome;

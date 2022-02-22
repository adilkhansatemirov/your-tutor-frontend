import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import React from 'react';

function DangerZone({ project, loading, setIsConfirmationModalOpen }) {
  return (
    project.project_status !== 'inactive' && (
      <InfoBox red>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Dange Zone
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Roboto" fontSize={12} fontWeight="medium">
          Deactivate Project
        </StyledTypography>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Roboto" fontSize={12}>
          Deactivating a Project will Remove assigned Freelancer and you won't be able to submit new Invoices to the
          client
        </StyledTypography>
        <StyledButton
          disabled={loading}
          onClick={() => setIsConfirmationModalOpen(true)}
          variant="red"
          size="small"
          textTransform="uppercase"
        >
          deactivate
        </StyledButton>
      </InfoBox>
    )
  );
}

export default DangerZone;

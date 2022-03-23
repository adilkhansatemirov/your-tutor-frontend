import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import React from 'react';

function Error({ project }) {
  return (
    project.project_status === 'error' && (
      <InfoBox red>
        <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
          Error
        </StyledTypography>
        <StyledTypography fontFamily="Roboto" fontSize={12}>
          {project.error_message}
        </StyledTypography>
      </InfoBox>
    )
  );
}

export default Error;

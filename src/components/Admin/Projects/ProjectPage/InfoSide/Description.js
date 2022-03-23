import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import React from 'react';

function Description({ project }) {
  return (
    <InfoBox>
      <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
        Description
      </StyledTypography>
      <StyledTypography fontFamily="Roboto" fontSize={12}>
        {project.description}
      </StyledTypography>
    </InfoBox>
  );
}

export default Description;

import { Box } from '@material-ui/core';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import React from 'react';
import { Controller } from 'react-hook-form';

function Project({ control, errors }) {
  return (
    <InfoBox style={{ marginTop: '35px' }}>
      <Box style={{ width: '65%' }}>
        <StyledTypography fontWeight="medium" fontSize="17px">
          Project
        </StyledTypography>
        <StyledTypography fontSize="16px" style={{ marginTop: '20px' }}>
          What's the name of this project. Please try to give it a unique name so it would be easier to find this
          project later on.
        </StyledTypography>
        <Controller
          as={<StyledTextField fontFamily="Poppins" />}
          placeholder="Project title"
          style={{ marginTop: '20px' }}
          name="title"
          type="text"
          error={Boolean(errors.title)}
          control={control}
          helperText={errors.title && errors.title.message}
          fullWidth
        />
        <StyledTypography fontSize="16px" style={{ marginTop: '20px' }}>
          Give a short description of the project. Freelancers would be able to see the description of the project.
        </StyledTypography>
        <Controller
          as={<StyledTextField placeholder="Project description" />}
          name="description"
          multiline
          rows={4}
          control={control}
          error={Boolean(errors.description)}
          helperText={errors.description && errors.description.message}
          style={{ height: 'auto', marginTop: '20px' }}
          fullWidth
        />
      </Box>
    </InfoBox>
  );
}

export default Project;

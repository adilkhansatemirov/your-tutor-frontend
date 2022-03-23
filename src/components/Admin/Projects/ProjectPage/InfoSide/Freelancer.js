import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import React from 'react';
import NumberFormat from 'react-number-format';

function Freelancer({ project }) {
  return (
    <InfoBox>
      <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
        Freelancer
      </StyledTypography>
      {project.freelancer_detail ? (
        <>
          <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={14} fontWeight="bold">
            {`${project.freelancer_detail.user.first_name} ${project.freelancer_detail.user.last_name}`}
          </StyledTypography>
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={12}>
            {project.freelancer_detail.user.email}
          </StyledTypography>
        </>
      ) : project.project_status === 'accepting_bids' || project.project_status === 'assigning_freelancer' ? (
        <StyledTypography style={{ marginBottom: '10px' }} fontFamily="Rubik" fontSize={14} fontWeight="bold">
          Not Selected
        </StyledTypography>
      ) : (
        <StyledTypography fontSize={12} fontWeight="bold">
          Deleted user
        </StyledTypography>
      )}

      <StyledTypography
        style={{ marginTop: '5px', marginBottom: '5px' }}
        fontFamily="Rubik"
        fontSize={20}
        fontWeight="medium"
      >
        <NumberFormat
          prefix="$"
          value={Number(project.freelancer_payment_amount)}
          decimalScale={2}
          fixedDecimalScale={true}
          displayType="text"
          thousandSeparator={true}
          suffix={project.client_type_of_billing === 'hourly_rate' ? '/hr' : ''}
        />
      </StyledTypography>
    </InfoBox>
  );
}

export default Freelancer;

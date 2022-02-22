import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import NumberFormat from 'react-number-format';

function InfoSide({ project }) {
  return (
    <>
      <Box style={{ width: '30%' }}>
        {project.project_status === 'error' && (
          <InfoBox red>
            <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
              Error
            </StyledTypography>
            <StyledTypography fontFamily="Roboto" fontSize={12}>
              {project.error_message}
            </StyledTypography>
          </InfoBox>
        )}
        <InfoBox>
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
            Company
          </StyledTypography>
          <StyledTypography style={{ marginBottom: '10px' }} fontFamily="Roboto" fontSize={14}>
            {project.client_detail.company_name}
          </StyledTypography>
          <StyledTypography style={{ marginBottom: '10px' }} fontFamily="Roboto" fontSize={14} fontWeight="bold">
            {project.client_detail.user.first_name} {project.client_detail.user.last_name}
          </StyledTypography>
          <StyledTypography style={{ marginBottom: '10px' }} fontFamily="Roboto" fontSize={14}>
            {project.client_detail.user.email}
          </StyledTypography>
        </InfoBox>

        <InfoBox>
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
            Freelancer
          </StyledTypography>

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
        <InfoBox>
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
            Description
          </StyledTypography>
          <StyledTypography fontFamily="Roboto" fontSize={12}>
            {project.description}
          </StyledTypography>
        </InfoBox>
      </Box>
    </>
  );
}

export default InfoSide;

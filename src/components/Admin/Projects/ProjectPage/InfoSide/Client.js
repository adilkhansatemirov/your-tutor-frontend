import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import InfoBox from 'components/Shared/UI/InfoBox';
import { SnackbarContext } from 'context/snackbarContext';
import React, { useContext } from 'react';
import NumberFormat from 'react-number-format';
import { enableProjectAutomatedInvoicing, disableProjectAutomatedInvoicing } from 'services/admin/projects';
import { capitalize, removeUnderscores } from 'utils/common';

function Client({ project, loading, setLoading, fetchProject }) {
  const { showSnackbar } = useContext(SnackbarContext);

  const enableAutomatedInvoicing = () => {
    setLoading(true);
    enableProjectAutomatedInvoicing(project.id)
      .then((response) => {
        showSnackbar(response.data.message, 'success');
        fetchProject();
        setLoading(false);
      })
      .catch(() => {
        fetchProject();
        setLoading(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  const disableAutomatedInvoicing = () => {
    setLoading(true);
    disableProjectAutomatedInvoicing(project.id)
      .then(() => {
        fetchProject();
        setLoading(false);
      })
      .catch(() => {
        fetchProject();
        setLoading(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  return (
    <InfoBox>
      <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={15} fontWeight="medium">
        Client
      </StyledTypography>
      <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={14} fontWeight="bold">
        {`${project.student_detail.user.first_name} ${project.student_detail.user.last_name}`}
      </StyledTypography>
      <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={12}>
        {project.student_detail.user.email}
      </StyledTypography>
      <StyledTypography style={{ marginBottom: '5px' }} fontFamily="Rubik" fontSize={12}>
        {project.student_detail.company_name}
      </StyledTypography>
      <StyledTypography
        style={{ marginTop: '20px', marginBottom: '5px' }}
        fontFamily="Rubik"
        fontSize={20}
        fontWeight="medium"
      >
        <NumberFormat
          prefix="₸"
          value={Number(project.student_payment_amount)}
          decimalScale={2}
          fixedDecimalScale={true}
          displayType="text"
          thousandSeparator={true}
          suffix={project.student_type_of_billing === 'hourly_rate' ? '/hr' : ''}
        />
      </StyledTypography>
      <StyledTypography style={{ marginBottom: '20px' }} fontFamily="Roboto" fontSize={12}>
        {capitalize(removeUnderscores(project.student_type_of_billing))}
      </StyledTypography>
      <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Roboto" fontSize={12}>
        {capitalize(removeUnderscores(project.invoicing_schedule))} Invoicing
      </StyledTypography>
      {project.student_type_of_billing !== 'custom_type' &&
        project.invoicing_schedule !== 'one_time' &&
        (project.automated_invoicing ? (
          <StyledButton
            disabled={loading}
            onClick={disableAutomatedInvoicing}
            variant="red"
            size="small"
            textTransform="uppercase"
          >
            Disable Automated Invoicing
          </StyledButton>
        ) : (
          <StyledButton
            disabled={loading}
            onClick={enableAutomatedInvoicing}
            variant="green"
            size="small"
            textTransform="uppercase"
          >
            Enable Automated Invoicing
          </StyledButton>
        ))}
    </InfoBox>
  );
}

export default Client;

import StyledTypography from 'components/Shared/Styled/StyledTypography';
import AuthLayout from '../AuthLayout';

function CheckEmail() {
  return (
    <AuthLayout>
      <StyledTypography type="h1" fontSize="33px" fontFamily="Poppins" fontWeight="bold" style={{ marginTop: '15px' }}>
        Check email
      </StyledTypography>
      <StyledTypography type="h3" fontFamily="Poppins" fontSize="15px" style={{ marginTop: '20px' }}>
        We have sent you a link to reset your password!
      </StyledTypography>
    </AuthLayout>
  );
}

export default CheckEmail;

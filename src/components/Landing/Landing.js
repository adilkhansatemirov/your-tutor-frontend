// import { Box } from '@material-ui/core';
// import StyledButton from 'components/Shared/Styled/StyledButton';
// import StyledTextField from 'components/Shared/Styled/StyledTextField';
// import StyledTypography from 'components/Shared/Styled/StyledTypography';
// import { Link } from 'react-router-dom';

import Header from 'components/Landing/Header/Header';
import HowItWorks from 'components/Landing/HowItWorks/HowItWorks';
import WhyChoose from 'components/Landing/WhyChoose/WhyChoose';
import Footer from 'components/Landing/Footer/Footer';

function PageLanding() {
  return (
    <>
      <Header
      // openModal={openModal}
      // setModalTemplate={setModalTemplate}
      // isAuthenticated={isAuthenticated}
      // redirectTo={redirectTo}
      // loading={loading}
      />
      {/* <Modal
        open={modalIsOpen}
        setModalTemplate={setModalTemplate}
        openModal={openModal}
        closeModal={closeModal}
        template={template}
      />*/}
      <HowItWorks />
      <WhyChoose />
      <Footer />
    </>
  );
}

export default PageLanding;

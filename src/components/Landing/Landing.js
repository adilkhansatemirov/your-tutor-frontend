// import { Box } from '@material-ui/core';
// import StyledButton from 'components/Shared/Styled/StyledButton';
// import StyledTextField from 'components/Shared/Styled/StyledTextField';
// import StyledTypography from 'components/Shared/Styled/StyledTypography';
// import { Link } from 'react-router-dom';

import Header from 'components/Landing/Header/Header';
import HowItWorks from 'components/Landing/HowItWorks/HowItWorks';
import WhyChoose from 'components/Landing/WhyChoose/WhyChoose';
import OurTutors from 'components/Landing/OurTutors/OurTutors';
import AboutUs from 'components/Landing/AboutUs/AboutUs';
import Footer from 'components/Landing/Footer/Footer';
import { useState } from 'react';
import { AuthContext } from 'context/authContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { signInWithToken } from 'services/auth';
import сookies from 'js-cookie';
import Modal from './Modal/Modal';

function PageLanding() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [template, setTemplate] = useState(null);

  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState('/');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    async function validateToken() {
      const token = сookies.get('token');

      if (token) {
        try {
          const response = await signInWithToken(token);
          setIsAuthenticated(true);
          const user = response.data.data;
          setUser(user);
          const role = user.user.role;
          const tutorDetail = user.tutor_detail;
          switch (role) {
            case 'admin':
              setRedirectTo('/admin/projects');
              break;
            case 'tutor':
              if (tutorDetail.qualified) {
                setRedirectTo('/tutor/dashboard');
              } else if (tutorDetail.interview_scheduled) {
                setRedirectTo('/tutor-application/done');
              } else {
                setRedirectTo('/tutor-application/resume');
              }
              break;
            case 'student':
              if (user.has_payment_info) {
                setRedirectTo('/student/invoices');
              } else {
                setRedirectTo('/student-application/payment-info');
              }
              break;
            default:
              setRedirectTo('/');
              break;
          }
        } catch (e) {
          console.error(e.response.status);
        }
      }
      setLoading(false);
    }
    validateToken();
    //eslint-disable-next-line
  }, []);

  const setModalTemplate = (template) => {
    setTemplate(template);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Header
        openModal={openModal}
        setModalTemplate={setModalTemplate}
        isAuthenticated={isAuthenticated}
        redirectTo={redirectTo}
        loading={loading}
      />
      <Modal
        open={modalIsOpen}
        setModalTemplate={setModalTemplate}
        openModal={openModal}
        closeModal={closeModal}
        template={template}
      />
      <AboutUs/>
      <HowItWorks />
      <WhyChoose />
      <OurTutors/>
      <Footer />
    </>
  );
}

export default PageLanding;

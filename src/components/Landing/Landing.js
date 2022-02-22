import { useContext, useEffect, useState } from 'react';
import Header from 'components/Landing/Header/Header';
import Modal from 'components/Landing/Modal/Modal';
import HowItWorks from 'components/Landing/HowItWorks/HowItWorks';
import WhyChoose from 'components/Landing/WhyChoose/WhyChoose';
import Footer from 'components/Landing/Footer/Footer';
import сookies from 'js-cookie';
import { signInWithToken } from 'services/auth';
import { AuthContext } from 'context/authContext';

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
          const freelancerDetail = user.freelancer_detail;
          switch (role) {
            case 'admin':
              setRedirectTo('/admin/projects');
              break;
            case 'freelancer':
              if (freelancerDetail.qualified) {
                setRedirectTo('/freelancer/dashboard');
              } else if (freelancerDetail.interview_scheduled) {
                setRedirectTo('/freelancer-application/done');
              } else {
                setRedirectTo('/freelancer-application/resume');
              }
              break;
            case 'client':
              if (user.has_payment_info) {
                setRedirectTo('/client/invoices');
              } else {
                setRedirectTo('/client-application/payment-info');
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
      <HowItWorks />
      <WhyChoose />
      <Footer />
    </>
  );
}

export default PageLanding;

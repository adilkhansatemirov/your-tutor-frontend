import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Box } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import { SnackbarContext } from 'context/snackbarContext';
import MainSide from './MainSide';
import InfoSide from './InfoSide';
import PageBar from 'components/Shared/UI/PageBar';
import theme from 'theme';
import { capitalize, removeUnderscores } from 'utils/common';
import { blockUser, unblockUser } from 'services/admin/users';
import { getFreelancer, qualifyFreelancer } from 'services/admin/freelancers';
import ResetPasswordModal from './ResetPasswordModal/ResetPasswordModal';
import PageLoader from 'components/Shared/Utils/PageLoader';

function FreelancerPage() {
  const [loading, setLoading] = useState(true);
  const [freelancer, setFreelancer] = useState();

  useEffect(() => {
    fetchFreelancer();
    // eslint-disable-next-line
  }, []);

  const fetchFreelancer = () => {
    getFreelancer(freelancerId)
      .then((response) => {
        setFreelancer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status !== 404) {
          showSnackbar('Something went wrong', 'error');
          setLoading(false);
        }
      });
  };
  const [submitting, setSubmitting] = useState(false);

  const { showSnackbar } = useContext(SnackbarContext);
  const [resetPasswordModalIsOpen, setResetPasswordModalIsOpen] = useState(false);

  const handleOpenResetPasswordModal = () => {
    setResetPasswordModalIsOpen(true);
  };
  const handleCloseResetPasswordModal = () => {
    setResetPasswordModalIsOpen(false);
  };
  const { freelancerId } = useParams();

  const handleApprove = () => {
    setSubmitting(true);
    qualifyFreelancer(freelancerId)
      .then(() => {
        showSnackbar('Freelancer approved', 'success');
        fetchFreelancer();
        setSubmitting(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setSubmitting(false);
      });
  };

  const handleBlock = () => {
    setSubmitting(true);
    blockUser(freelancerId)
      .then(() => {
        showSnackbar('Freelancer blocked', 'success');
        fetchFreelancer();
        setSubmitting(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setSubmitting(false);
      });
  };

  const handleUnblock = () => {
    setSubmitting(true);
    unblockUser(freelancerId)
      .then(() => {
        showSnackbar('Freelancer unblocked', 'success');
        fetchFreelancer();
        setSubmitting(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setSubmitting(false);
      });
  };

  return loading ? (
    <PageLoader />
  ) : (
    <>
      {(freelancer.profile_status === 'blocked' || freelancer.profile_status === 'pending_approval') && (
        <PageBar
          text={capitalize(removeUnderscores(freelancer.profile_status))}
          barColor={
            freelancer.profile_status === 'blocked' ? theme.palette.tomatoRed.main : theme.palette.lightYellow.main
          }
          textColor={freelancer.profile_status === 'blocked' ? 'white' : 'black'}
        />
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{
          marginTop:
            freelancer.profile_status === 'blocked' || freelancer.profile_status === 'pending_approval'
              ? '45px'
              : '25px',
        }}
      >
        <StyledTypography fontWeight="medium" fontSize="22px" fontFamily="Rubik">
          {`${freelancer.first_name} ${freelancer.last_name}`}
        </StyledTypography>

        <Box>
          {freelancer.profile_status === 'pending_approval' && (
            <StyledButton
              disabled={submitting}
              onClick={handleApprove}
              textTransform="uppercase"
              variant="green"
              size="small"
            >
              Approve
            </StyledButton>
          )}
          <Link to={`/admin/freelancers/${freelancerId}/edit`} style={{ textDecoration: 'none' }}>
            <StyledButton
              disabled={submitting}
              style={{ marginLeft: '10px' }}
              textTransform="uppercase"
              variant="light-blue"
              size="small"
            >
              Edit
            </StyledButton>
          </Link>
          <StyledButton
            style={{ marginLeft: '10px' }}
            onClick={handleOpenResetPasswordModal}
            textTransform="uppercase"
            size="small"
            variant="light-blue"
          >
            reset password
          </StyledButton>
          {freelancer.profile_status !== 'blocked' && (
            <StyledButton
              disabled={submitting}
              style={{ marginLeft: '10px' }}
              onClick={handleBlock}
              textTransform="uppercase"
              variant="red"
              size="small"
            >
              Block
            </StyledButton>
          )}
          {freelancer.profile_status === 'blocked' && (
            <StyledButton
              disabled={submitting}
              style={{ marginLeft: '10px' }}
              onClick={handleUnblock}
              textTransform="uppercase"
              variant="green"
              size="small"
            >
              Unblock
            </StyledButton>
          )}
        </Box>
      </Box>
      <Box display="flex" style={{ marginTop: '35px' }}>
        <MainSide freelancer={freelancer} />
        <InfoSide freelancer={freelancer} />
      </Box>

      <ResetPasswordModal
        open={resetPasswordModalIsOpen}
        onClose={handleCloseResetPasswordModal}
        freelancer={freelancer}
      />
    </>
  );
}

export default FreelancerPage;

import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import StepHeader from '../StepHeader';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { finishAllSteps } from 'services/freelancer/freelancers';
import { SnackbarContext } from 'context/snackbarContext';
import { calendlyEvents } from 'constants/constants';

import arrowLeftIcon from 'assets/icons/arrow-left.svg';
import theme from 'theme';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  arrowRight: {
    marginRight: '10px',
  },
  previousStepButton: {
    background: 'transparent',
    fontWeight: 500,
    '&:hover': {
      background: 'transparent',
    },
  },
  nextStepButton: {
    width: '150px',
    height: '50px',
    marginLeft: '10px',
    backgroundColor: theme.palette.spaceBlue,
    color: '#FFF',
    '&:hover': {
      backgroundColor: theme.palette.spaceBlue,
    },
  },
}));

const calendly = `<div
  class="calendly-inline-widget"
  data-url="https://calendly.com${process.env.REACT_APP_CALENDLY_SCHEDULE_INTERVIEW}?hide_event_type_details=1"
  style="position: relative;min-width:320px;height:450px;"
  data-processed="true">
  <div class="calendly-spinner">
    <div class="calendly-bounce1"></div>
    <div class="calendly-bounce2"></div>
    <div class="calendly-bounce3"></div>
  </div>
  <iframe
    src="https://calendly.com${process.env.REACT_APP_CALENDLY_SCHEDULE_INTERVIEW}?embed_domain=${process.env.REACT_APP_APP_URL}&amp;embed_type=Inline&amp;hide_event_type_details=1"
    width="100%"
    height="100%"
    frameborder="0"
  ></iframe>
  </div>
  <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>`;

function Interview() {
  const classes = useStyles();
  const history = useHistory();
  const { showSnackbar } = useContext(SnackbarContext);

  const isCalendlyEvent = (e) => e.data.event && e.data.event.indexOf('calendly') === 0;

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (isCalendlyEvent(e)) {
        if (e.data.event === calendlyEvents.event_scheduled) {
          finishAllSteps()
            .then(() => {
              history.push('/freelancer-application/done');
            })
            .catch(() => {
              showSnackbar('Something went wrong', 'error');
            });
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.container}>
      <StepHeader title="Schedule Interview" step={7} />
      <Box className={classes.callendarContainer}>
        <div dangerouslySetInnerHTML={{ __html: calendly }}></div>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <StyledButton
          onClick={() => history.push('/freelancer-application/software-skills')}
          className={classes.previousStepButton}
        >
          <img className={classes.arrowRight} src={arrowLeftIcon} alt="arrow-left" />{' '}
          <StyledTypography fontSize={14} style={{ color: theme.palette.textGray }}>
            Previous Step
          </StyledTypography>
        </StyledButton>
      </Box>
    </div>
  );
}

export default Interview;

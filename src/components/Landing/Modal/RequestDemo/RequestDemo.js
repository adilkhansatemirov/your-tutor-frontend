import { useState, useEffect, useContext } from 'react';
// import { SnackbarContext } from 'context/snackbarContext';
import { calendlyEvents } from 'constants/constants';
import { Box, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  callendarContainer: {
    width: '100%',
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const calendly = `<div
      class="calendly-inline-widget"
      data-url="https://calendly.com${process.env.REACT_APP_CALENDLY_SCHEDULE_DEMO}?hide_event_type_details=1"
      style="position: relative;min-width:320px;width:100%;height:555px;"
      data-processed="true"
    >
      <div class="calendly-spinner">
        <div class="calendly-bounce1"></div>
        <div class="calendly-bounce2"></div>
        <div class="calendly-bounce3"></div>
      </div>
      <iframe
        src="https://calendly.com${process.env.REACT_APP_CALENDLY_SCHEDULE_DEMO}?embed_domain=${process.env.REACT_APP_APP_URL}&amp;embed_type=Inline&amp;hide_event_type_details=1"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
    <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>`;

function RequestDemo({ closeModal }) {
  const classes = useStyles();
  // const { // showSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const isCalendlyEvent = (e) => e.data.event && e.data.event.indexOf('calendly') === 0;
  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (isCalendlyEvent(e)) {
        if (e.data.event === calendlyEvents.event_scheduled) {
          // showSnackbar('You have scheduled an event, check your email', 'success');
          closeModal();
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Box className={classes.callendarContainer}>
      {loading && (
        <Box className={classes.loadingContainer}>
          <CircularProgress size={60} />
        </Box>
      )}
      <div dangerouslySetInnerHTML={{ __html: calendly }} />
    </Box>
  );
}

export default RequestDemo;

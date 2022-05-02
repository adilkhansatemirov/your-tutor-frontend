import { useState, useEffect, useContext } from 'react';
import { SnackbarContext } from 'context/snackbarContext';
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

const calendly = `<div class="calendly-inline-widget" data-url="https://calendly.com/adilkhansatemirov" style="min-width:320px;height:630px;"></div>`;

function RequestDemo({ closeModal }) {
  const classes = useStyles();
  const { showSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const isCalendlyEvent = (e) => e.data.event && e.data.event.indexOf('calendly') === 0;
  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (isCalendlyEvent(e)) {
        if (e.data.event === calendlyEvents.event_scheduled) {
          showSnackbar('You have scheduled an event, check your email', 'success');
          closeModal();
        }
      }
    });

    const script = document.createElement('script');

    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    document.body.appendChild(script);

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

import { Component } from 'react';
import { Box } from '@material-ui/core';
import Rollbar from 'rollbar';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      rollbar: new Rollbar({
        enabled: process.env.NODE_ENV === 'production' ? true : false,
        accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
          environment: 'production',
          client: {
            javascript: {
              source_map_enabled: true,
              code_version: process.env.REACT_APP_GIT_SHA,
              guess_uncaught_frames: true,
            },
          },
        },
      }),
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.state.rollbar.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box style={{ height: '100vh' }} display="flex" justifyContent="center" alignItems="center">
          Something went wrong
        </Box>
      );
    }
    return this.props.children;
  }
}

import { BrowserRouter, Switch, Route, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Landing from 'components/Landing/Landing';
import AccessDenied from 'components/Errors/403/403';
import NotFound from 'components/Errors/404/404';
import CheckEmail from 'components/Auth/CheckEmail/CheckEmail';
import EnterCode from 'components/Auth/EnterCode/EnterCode';
import ForgotPassword from 'components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from 'components/Auth/ResetPassword/ResetPassword';
import SignIn from 'components/Auth/SignIn/SignIn';
import theme from 'theme';

import AdminLayout from 'components/Admin/AdminLayout';
import ClientLayout from 'components/Client/ClientLayout';
import FreelancerLayout from 'components/Freelancer/FreelancerLayout';

import FreelancerApplicationLayout from 'components/FreelancerApplication/FreelancerApplicationLayout';
import ClientApplicationLayout from 'components/ClientApplication/ClientApplicationLayout';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.white,
    },
    'body *::-webkit-scrollbar': {
      width: '0.4em',
    },
    'body *::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.smokeWhite,
      borderRadius: '4px',
    },
    'body *::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.skyBlue.main,
      borderRadius: '4px',
    },
    'input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    'input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
}));

export const history = createBrowserHistory();

function App() {
  const classes = useStyles();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if (window.location.protocol !== 'https:') {
        window.location.protocol = 'https';
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Router history={history}>
        <CssBaseline classes={classes} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/403" component={AccessDenied} />
          <Route path="/404" component={NotFound} />

          <Route path="/check-email" component={CheckEmail} />
          <Route path="/enter-code" component={EnterCode} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/sign-in" component={SignIn} />

          <Route path="/admin" component={AdminLayout} />
          <Route path="/client" component={ClientLayout} />
          <Route path="/freelancer" component={FreelancerLayout} />

          <Route path="/freelancer-application" component={FreelancerApplicationLayout} />
          <Route path="/client-application" component={ClientApplicationLayout} />

          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Switch, Route, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Landing from 'components/Landing/Landing';
import NotFound from 'components/Errors/404/404';
import theme from 'theme';

import AdminLayout from 'components/Admin/AdminLayout';
import StudentLayout from 'components/Student/StudentLayout';
import TutorLayout from 'components/Tutor/TutorLayout';

import TutorApplicationLayout from 'components/TutorApplication/TutorApplicationLayout';
import StudentApplicationLayout from 'components/StudentApplication/StudentApplicationLayout';

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

  return (
    <BrowserRouter>
      <Router history={history}>
        <CssBaseline classes={classes} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/404" component={NotFound} />

          <Route path="/admin" component={AdminLayout} />
          <Route path="/student" component={StudentLayout} />
          <Route path="/tutor" component={TutorLayout} />

          <Route path="/tutor-application" component={TutorApplicationLayout} />
          <Route path="/student-application" component={StudentApplicationLayout} />

          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </BrowserRouter>
  );
}

export default App;

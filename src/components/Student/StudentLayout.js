import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import Sidebar from 'components/Shared/UI/Sidebar/Sidebar';
import Settings from 'components/Student/Settings/Settings';
import InvoicesList from 'components/Student/Invoices/InvoicesList/InvoicesList';
// import ProjectsList from 'components/Student/Projects/ProjectsList';
// import NewProject from 'components/Student/Projects/NewProject/NewProject';
// import ProjectPage from './Projects/ProjectPage/ProjectPage';
import InvoicePage from 'components/Student/Invoices/InvoicePage/InvoicePage';
import { Switch, Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import сookies from 'js-cookie';
import { signInWithToken } from 'services/auth';
import { setSession } from 'services/api';
import { SnackbarContext } from 'context/snackbarContext';
import AuthLoader from 'components/Shared/Utils/AuthLoader';
import { AuthContext } from 'context/authContext';

import invoicesIcon from 'assets/icons/invoices.svg';
// import projectsIcon from 'assets/icons/projects.png';
import settingsIcon from 'assets/icons/settings.svg';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    flex: 1,
    paddingLeft: '30px',
    paddingRight: '30px',
    position: 'relative',
  },
}));

function Studentayout() {
  const classes = useStyles();
  const history = useHistory();
  const [authenticating, setAuthenticating] = useState(true);
  const { showSnackbar } = useContext(SnackbarContext);
  const { setUser, setRefererPage } = useContext(AuthContext);
  const { pathname } = useLocation();

  const sidebarItems = [
    {
      name: 'Invoices',
      to: '/student/invoices',
      icon: invoicesIcon,
    },
    // {
    //   name: 'Projects',
    //   to: '/student/projects',
    //   icon: projectsIcon,
    // },
    {
      name: 'Settings',
      to: '/student/settings',
      icon: settingsIcon,
    },
  ];

  useEffect(() => {
    const token = сookies.get('token');
    if (!token) {
      showSnackbar('Please log in to continue', 'error');
      setRefererPage(pathname);
      history.push('/sign-in');
      return;
    }

    signInWithToken(token)
      .then((response) => {
        if (response.data.data.user.role !== 'student') {
          history.replace('/403');
          return;
        }
        setSession(token);
        setUser(response.data.data);
        setAuthenticating(false);
      })
      .catch(() => {
        showSnackbar('Please log in to continue', 'error');
        setRefererPage(pathname);
        history.push('/sign-in');
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      {authenticating ? (
        <AuthLoader />
      ) : (
        <>
          <Sidebar sidebarItems={sidebarItems} />
          <main className={classes.content}>
            <Switch>
              <Route exact path="/student/settings" component={Settings} />
              {/* <Route exact path="/student/projects" component={ProjectsList} />
              <Route exact path="/student/projects/new" component={NewProject} />
              <Route exact path="/student/projects/:projectId" component={ProjectPage} /> */}
              <Route exact path="/student/invoices" component={InvoicesList} />
              <Route exact path="/student/invoices/:invoiceId" component={InvoicePage} />

              <Redirect from="*" to="/404" />
            </Switch>
          </main>
        </>
      )}
    </div>
  );
}

export default Studentayout;

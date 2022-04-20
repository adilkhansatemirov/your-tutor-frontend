import { useContext, useEffect, useState } from 'react';
import сookies from 'js-cookie';
import { makeStyles } from '@material-ui/core';
import Sidebar from 'components/Shared/UI/Sidebar/Sidebar';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import ProjectsList from 'components/Admin/Projects/ProjectsList/ProjectsList';
import InvoicesList from 'components/Admin/Invoices/InvoicesList/InvoicesList';
import TimesheetsList from 'components/Admin/Timesheets/TimesheetsList/TimesheetsList';
import ClientList from 'components/Admin/Clients/ClientList/ClientList';
import FreelancerList from 'components/Admin/Freelancers/FreelancerList/FreelancerList';
import Settings from 'components/Admin/Settings/Settings';
import ProjectPage from 'components/Admin/Projects/ProjectPage/ProjectPage';
import NewProject from './Projects/NewProject/NewProject';
import TimesheetPage from './Timesheets/TimesheetPage/TimesheetPage';
import FreelancerPage from './Freelancers/FreelancerPage/FreelancerPage';
import InvoicePageWrapper from 'components/Admin/Invoices/InvoicePage/InvoicePageWrapper';
import EditProjectWrapper from 'components/Admin/Projects/EditProject/EditProjectWrapper';
import NewInvoiceWrapper from 'components/Admin/Invoices/NewInvoice/NewInvoiceWrapper';
import EditFreelancer from 'components/Admin/Freelancers/EditFreelancer/EditFreelancer';
import { signInWithToken } from 'services/auth';
import { setSession } from 'services/api';
import AuthLoader from 'components/Shared/Utils/AuthLoader';
import { SnackbarContext } from 'context/snackbarContext';
import { AuthContext } from 'context/authContext';
import PaymentsList from './Payments/PaymentsList';

import projectsIcon from 'assets/icons/lessons.svg';
import invoicesIcon from 'assets/icons/invoices.svg';
// import paymentIcon from 'assets/icons/calendar.png';
import timesheetsIcon from 'assets/icons/timesheets.svg';
import clientsIcon from 'assets/icons/students.svg';
import freelancersIcon from 'assets/icons/tutors.svg';
import settingsIcon from 'assets/icons/settings.svg';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    flex: 1,
    paddingLeft: '30px',
    paddingRight: '60px',
    position: 'relative',
  },
}));

function AdminLayout() {
  const classes = useStyles();
  const history = useHistory();
  const [authenticating, setAuthenticating] = useState(true);
  const { showSnackbar } = useContext(SnackbarContext);
  const { setUser, setRefererPage } = useContext(AuthContext);
  const { pathname } = useLocation();

  const sidebarItems = [
    {
      name: 'Projects',
      to: '/admin/projects',
      icon: projectsIcon,
    },
    {
      name: 'Invoices',
      to: '/admin/invoices',
      icon: invoicesIcon,
    },
    // {
    //   name: 'Payments',
    //   to: '/admin/payments',
    //   icon: paymentIcon,
    // },
    {
      name: 'Timesheets',
      to: '/admin/timesheets',
      icon: timesheetsIcon,
    },
    {
      name: 'Students',
      to: '/admin/students',
      icon: clientsIcon,
    },
    {
      name: 'Tutors',
      to: '/admin/tutors',
      icon: freelancersIcon,
    },
    {
      name: 'Settings',
      to: '/admin/settings',
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
        if (response.data.data.user.role !== 'admin') {
          history.replace('/403');
          return;
        }
        setUser(response.data.data);
        setSession(token);
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
              <Route exact path="/admin/projects" component={ProjectsList} />
              <Route exact path="/admin/projects/new" component={NewProject} />
              <Route exact path="/admin/projects/:projectId" component={ProjectPage} />
              <Route exact path="/admin/projects/:projectId/edit" component={EditProjectWrapper} />
              <Route exact path="/admin/projects/:projectId/invoices/new" component={NewInvoiceWrapper} />

              <Route exact path="/admin/invoices" component={InvoicesList} />
              <Route exact path="/admin/invoices/:invoiceId" component={InvoicePageWrapper} />

              <Route exact path="/admin/payments" component={PaymentsList} />

              <Route exact path="/admin/timesheets" component={TimesheetsList} />
              <Route exact path="/admin/timesheets/:timesheetId" component={TimesheetPage} />

              <Route exact path="/admin/students" component={ClientList} />

              <Route exact path="/admin/tutors" component={FreelancerList} />
              <Route exact path="/admin/freelancers/:freelancerId" component={FreelancerPage} />
              {/* <Route exact path="/admin/freelancers/:freelancerId/edit" component={EditFreelancer} /> */}

              <Route exact path="/admin/settings" component={Settings} />

              {/* <Redirect from="*" to="/404" /> */}
            </Switch>
          </main>
        </>
      )}
    </div>
  );
}

export default AdminLayout;

import { useContext, useEffect, useState } from 'react';
import сookies from 'js-cookie';
import { makeStyles } from '@material-ui/core';
import { FreelancerContext } from 'context/freelancerContext';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Dashboard from 'components/Tutor/Dashboard/Dashboard';
import ContractList from 'components/Tutor/Contract/ContractList/ContractList';
import { signInWithToken } from 'services/auth';
import { setSession } from 'services/api';
import Sidebar from 'components/Shared/UI/Sidebar/Sidebar';
import { SnackbarContext } from 'context/snackbarContext';
import AuthLoader from 'components/Shared/Utils/AuthLoader';
import OpportunityList from 'components/Tutor/Opportunity/OpportunityList/OpportunityList';
import Settings from 'components/Tutor/Settings/Settings';

import dashboardIcon from 'assets/icons/lessons.svg';
import contractsIcon from 'assets/icons/lessons.svg';
import opportunitiesIcon from 'assets/icons/lessons.svg';
import settingsIcon from 'assets/icons/settings.svg';
import { AuthContext } from 'context/authContext';
import ContractPage from './Contract/ContractPage/ContractPage';
import NewTimesheet from './Contract/Timesheet/NewTimesheet/NewTimesheet';
import TimesheetPage from './Contract/Timesheet/TimesheetPage';
import EditProfileInfo from './Settings/EditProfileInfo/EditProfileInfo';

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

function TutorLayout() {
  const classes = useStyles();
  const history = useHistory();
  const [authenticating, setAuthenticating] = useState(true);
  const { showSnackbar } = useContext(SnackbarContext);
  const { setUser, setRefererPage } = useContext(AuthContext);
  const { pathname } = useLocation();

  const { opportunities, contracts } = useContext(FreelancerContext);

  const sidebarItems = [
    {
      name: 'Dashboard',
      to: '/tutor/dashboard',
      icon: dashboardIcon,
    },
    {
      name: 'My contracts',
      to: '/tutor/contracts',
      icon: contractsIcon,
      badge: contracts.length,
    },
    {
      name: 'New Opportunities',
      to: '/tutor/opportunities',
      icon: opportunitiesIcon,
      badge: opportunities.length,
    },
    {
      name: 'Settings',
      to: '/tutor/settings',
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
        if (response.data.data.user.role !== 'tutor') {
          history.push('/403');
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
              <Route exact path="/tutor/dashboard" component={Dashboard} />
              <Route exact path="/tutor/contracts" component={ContractList} />
              <Route exact path="/tutor/contracts/:contractId" component={ContractPage} />
              <Route exact path="/tutor/contracts/:contractId/timesheets/new" component={NewTimesheet} />
              <Route exact path="/tutor/contracts/:contractId/timesheets/:timesheetId" component={TimesheetPage} />
              <Route exact path="/tutor/opportunities" component={OpportunityList} />
              <Route exact path="/tutor/settings" component={Settings} />
              <Route exact path="/tutor/settings/edit-profile-info" component={EditProfileInfo} />

              <Redirect from="*" to="/404" />
            </Switch>
          </main>
        </>
      )}
    </div>
  );
}

export default TutorLayout;

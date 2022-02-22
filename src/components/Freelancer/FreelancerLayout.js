import { useContext, useEffect, useState } from 'react';
import сookies from 'js-cookie';
import { makeStyles } from '@material-ui/core';
import { FreelancerContext } from 'context/freelancerContext';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Dashboard from 'components/Freelancer/Dashboard/Dashboard';
import ContractList from 'components/Freelancer/Contract/ContractList/ContractList';
import { signInWithToken } from 'services/auth';
import { setSession } from 'services/api';
import Sidebar from 'components/Shared/UI/Sidebar/Sidebar';
import { SnackbarContext } from 'context/snackbarContext';
import AuthLoader from 'components/Shared/Utils/AuthLoader';
import OpportunityList from 'components/Freelancer/Opportunity/OpportunityList/OpportunityList';
import Settings from 'components/Freelancer/Settings/Settings';

import dashboardIcon from 'assets/icons/dashboard.png';
import contractsIcon from 'assets/icons/contracts.png';
import opportunitiesIcon from 'assets/icons/opportunities.png';
import settingsIcon from 'assets/icons/settings.png';
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

function FreelancerLayout() {
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
      to: '/freelancer/dashboard',
      icon: dashboardIcon,
    },
    {
      name: 'My contracts',
      to: '/freelancer/contracts',
      icon: contractsIcon,
      badge: contracts.length,
    },
    {
      name: 'New Opportunities',
      to: '/freelancer/opportunities',
      icon: opportunitiesIcon,
      badge: opportunities.length,
    },
    {
      name: 'Settings',
      to: '/freelancer/settings',
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
        if (response.data.data.user.role !== 'freelancer') {
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
              <Route exact path="/freelancer/dashboard" component={Dashboard} />
              <Route exact path="/freelancer/contracts" component={ContractList} />
              <Route exact path="/freelancer/contracts/:contractId" component={ContractPage} />
              <Route exact path="/freelancer/contracts/:contractId/timesheets/new" component={NewTimesheet} />
              <Route exact path="/freelancer/contracts/:contractId/timesheets/:timesheetId" component={TimesheetPage} />
              <Route exact path="/freelancer/opportunities" component={OpportunityList} />
              <Route exact path="/freelancer/settings" component={Settings} />
              <Route exact path="/freelancer/settings/edit-profile-info" component={EditProfileInfo} />

              <Redirect from="*" to="/404" />
            </Switch>
          </main>
        </>
      )}
    </div>
  );
}

export default FreelancerLayout;

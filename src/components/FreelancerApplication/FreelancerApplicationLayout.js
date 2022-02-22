import { Box, makeStyles } from '@material-ui/core';
import { Route, Switch, useHistory } from 'react-router-dom';
import FreelancerApplicationSteps from './FreelancerApplicationSteps';

import Resume from 'components/FreelancerApplication/Steps/Resume';
import TaxSkills from './Steps/TaxSkills';
import { useContext, useEffect, useState } from 'react';
import сookies from 'js-cookie';
import { SnackbarContext } from 'context/snackbarContext';
import { signInWithToken } from 'services/auth';
import { setSession } from 'services/api';
import { AuthContext } from 'context/authContext';
import AuthLoader from 'components/Shared/Utils/AuthLoader';
import BookkeepingSkills from './Steps/BookkeepingSkills';
import AccountingSkills from './Steps/AccountingSkills';
import AuditSkills from './Steps/AuditSkills';
import SoftwareSkills from './Steps/SoftwareSkills';
import Interview from './Steps/Interview';
import Done from './Steps/Done';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F7FB',
    width: '100%',
    height: '100vh',
  },
  container: {
    backgroundColor: '#FFF',
    display: 'flex',
    borderRadius: '5px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
    height: '700px',
    width: '1050px',
    marginRight: '30px',
    marginLeft: '30px',
  },
  content: {
    padding: '64px 64px 54px',
    width: '100%',
  },
}));

function ApplicationLayout() {
  const classes = useStyles();
  const history = useHistory();
  const [authenticating, setAuthenticating] = useState(true);
  const { setUser } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    const token = сookies.get('token');
    if (!token) {
      showSnackbar('Please log in to continue', 'error');
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
        history.push('/sign-in');
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <main className={classes.container}>
        {authenticating ? (
          <AuthLoader />
        ) : (
          <>
            <FreelancerApplicationSteps />
            <Box className={classes.content}>
              <Switch>
                <Route path="/freelancer-application/resume" component={Resume} />
                <Route path="/freelancer-application/tax-skills" component={TaxSkills} />
                <Route path="/freelancer-application/bookkeeping-skills" component={BookkeepingSkills} />
                <Route path="/freelancer-application/accounting-skills" component={AccountingSkills} />
                <Route path="/freelancer-application/audit-skills" component={AuditSkills} />
                <Route path="/freelancer-application/software-skills" component={SoftwareSkills} />
                <Route path="/freelancer-application/interview" component={Interview} />
                <Route path="/freelancer-application/done" component={Done} />
              </Switch>
            </Box>
          </>
        )}
      </main>
    </div>
  );
}

export default ApplicationLayout;

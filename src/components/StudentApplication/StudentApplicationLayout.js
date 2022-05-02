import { Box, makeStyles } from '@material-ui/core';
import { SnackbarContext } from 'context/snackbarContext';
import { useContext, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import StudentApplicationSteps from './StudentApplicationSteps';
import PaymentInfo from './Steps/PaymentInfo';
import cookies from 'js-cookie';
import { AuthContext } from 'context/authContext';
import { signInWithToken } from 'services/auth';
import { setSession } from 'services/api';
import AuthLoader from 'components/Shared/Utils/AuthLoader';

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
    height: '440px',
    width: '1035px',
    marginRight: '30px',
    marginLeft: '30px',
  },
  content: {
    padding: '10px 25px 25px 25px',
    width: '100%',
  },
}));

function StudentApplicationLayout() {
  const classes = useStyles();
  const { showSnackbar } = useContext(SnackbarContext);
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  const [authenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const token = cookies.get('token');
    if (!token) {
      showSnackbar('Please log in to continue', 'error');
      history.push('/sign-in');
      return;
    }

    signInWithToken(token)
      .then((response) => {
        if (response.data.data.user.role !== 'student') {
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
            <StudentApplicationSteps />
            <Box className={classes.content}>
              <Switch>
                <Route path="/student-application/payment-info" component={PaymentInfo} />
              </Switch>
            </Box>
          </>
        )}
      </main>
    </div>
  );
}

export default StudentApplicationLayout;

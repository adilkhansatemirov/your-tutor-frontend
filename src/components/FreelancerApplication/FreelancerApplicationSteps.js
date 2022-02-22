import { useEffect, useState } from 'react';
import { List, ListItem, Box, makeStyles } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import logoWhite from 'assets/images/logo-white.png';
import checkIcon from 'assets/icons/check.svg';

const list = [
  { step: 1, text: 'Upload resume' },
  { step: 2, text: 'Tax skills' },
  { step: 3, text: 'Bookkeeping skills' },
  { step: 4, text: 'Accounting skills' },
  { step: 5, text: 'Audit skills' },
  { step: 6, text: 'Software skills' },
  { step: 7, text: 'Schedule interview' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '308px',
    backgroundColor: theme.palette.navyBlue.main,
    backgroundSize: 'cover',
    paddingTop: '120px',
    paddingLeft: '64px',
    borderRadius: '5px 0 0 5px',
  },
  logo: {
    width: '139px',
    height: '68px',
  },
  list: {
    marginTop: '20px',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 0,
    position: 'relative',
  },
  listItemCompleted: {
    '& p:last-child': {
      textDecoration: 'line-through',
    },
    '& $iconContainer': {
      display: 'flex',
    },
  },
  iconContainer: {
    display: 'none',
    position: 'absolute',
    left: '-27px',
    bottom: '20px',
    width: '15px',
    height: '15px',
  },
}));

function ApplicationSteps() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { pathname } = useLocation();
  const { listen } = useHistory();

  useEffect(() => {
    findActiveStep(pathname);
    listen((location) => {
      findActiveStep(location.pathname);
    });
    // eslint-disable-next-line
  }, []);

  const findActiveStep = (currectPathname) => {
    switch (currectPathname) {
      case '/freelancer-application/resume':
        setActiveStep(1);
        break;
      case '/freelancer-application/tax-skills':
        setActiveStep(2);
        break;
      case '/freelancer-application/bookkeeping-skills':
        setActiveStep(3);
        break;
      case '/freelancer-application/accounting-skills':
        setActiveStep(4);
        break;
      case '/freelancer-application/audit-skills':
        setActiveStep(5);
        break;
      case '/freelancer-application/software-skills':
        setActiveStep(6);
        break;
      case '/freelancer-application/interview':
        setActiveStep(7);
        break;
      case '/freelancer-application/done':
        setActiveStep(8);
        break;
      default:
        setActiveStep(1);
        break;
    }
  };

  return (
    <div className={classes.root}>
      <img className={classes.logo} src={logoWhite} alt="inhome-logo" />
      <List className={classes.list} disablePadding>
        {list.map((item) => (
          <ListItem
            className={clsx(
              classes.listItem,
              item.step < activeStep && classes.listItemCompleted,
              item.step > activeStep && classes.listItemInactive,
            )}
            key={item.step}
            disableGutters
          >
            <Box className={classes.iconContainer}>
              <img src={checkIcon} alt="check" />
            </Box>
            <StyledTypography color="white" style={{ opacity: 0.5, marginBottom: '4px' }} fontSize={10}>
              Step: {item.step}
            </StyledTypography>
            <StyledTypography
              fontSize={20}
              fontFamily="Rubik"
              type="h5"
              color="white"
              style={{ opacity: item.step <= activeStep ? 1 : 0.5, marginBottom: '8px' }}
            >
              {item.text}
            </StyledTypography>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ApplicationSteps;

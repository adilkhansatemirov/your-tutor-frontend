import { useEffect, useState } from 'react';
import { List, ListItem, Box, makeStyles } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import logoWhite from 'assets/images/logo-white.png';
import semiTransparentBackground from 'assets/images/background-semi-transparent.png';

const list = [{ step: 1, text: 'Payment information' }];

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '308px',
    backgroundImage: `url(${semiTransparentBackground}), linear-gradient(260.83deg, #012C5D -97.24%, #004BA1 81.69%)`,
    backgroundSize: 'cover',
    paddingTop: '85px',
    paddingLeft: '60px',
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
    '& $stepText': {
      textDecoration: 'line-through',
    },
    '& $iconContainer': {
      display: 'flex',
    },
  },
  listItemInactive: {
    opacity: 0.7,
  },
  stepNumber: {
    color: '#FFF',
    fontSize: '10px',
  },
  stepText: {
    color: '#FFF',
  },
  iconContainer: {
    display: 'none',
    position: 'absolute',
    left: '-20px',
    bottom: '15px',
    backgroundColor: theme.palette.lightYellow.main,
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '60%',
  },
}));

function ClientSteps() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/client/resume':
        setActiveStep(1);
        break;
      default:
        setActiveStep(1);
        break;
    }
    // eslint-disable-next-line
  }, []);

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
              <img className={classes.icon} src="/icons/check.svg" alt="check" />
            </Box>
            <Box className={classes.stepNumber}>Step: {item.step}</Box>
            <StyledTypography fontSize={20} fontWeight="medium" type="h5" className={classes.stepText}>
              {item.text}
            </StyledTypography>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ClientSteps;

import { useState } from 'react';
import { cloneElement } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, useScrollTrigger, Container, Divider } from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';

import useStyles from './Header.style';

import theme from 'theme';
import { modalTemplates } from 'constants/constants';

import logoWhite from 'assets/icons/logo.svg';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: trigger ? { backgroundColor: theme.palette.white } : {},
  });
}

function Header({ openModal, setModalTemplate, isAuthenticated, redirectTo, loading }) {
  const classes = useStyles();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuOpen = (open) => {
    setMenuOpen(open);
  };

  function renderMenu() {
    return (
      <Box className={classes.menu}>
        <Container>
          <Box className={classes.toolbarPlaceholder}></Box>
          <Box className={classes.menuContainer}>
            <StyledTypography
              fontFamily="Poppins"
              className={classes.menuLink}
              weight="bold"
              onClick={() => {
                setModalTemplate(modalTemplates.requestDemo);
                openModal();
              }}
            >
              Hire Accountants
            </StyledTypography>
            <Divider className={classes.divider} />
            <StyledTypography
              fontFamily="Poppins"
              className={classes.menuLink}
              weight="bold"
              onClick={() => {
                setModalTemplate(modalTemplates.signUp);
                openModal();
              }}
            >
              Apply As An Accountant
            </StyledTypography>
            <Divider className={classes.divider} />
            {/* <StyledTypography
              fontFamily="Poppins"
              className={classes.menuLink}
              weight="bold"
              onClick={() => {
                setModalTemplate(modalTemplates.contactSupport);
                openModal();
              }}
            >
              Contact Support
            </StyledTypography> */}
          </Box>
        </Container>
      </Box>
    );
  }

  function renderLoginButton() {
    if (loading) {
      return (
        <StyledButton fontFamily="Poppins" className={classes.loginButton}>
          Loading..
        </StyledButton>
      );
    }

    return (
      <StyledButton
        fontFamily="Poppins"
        onClick={() => {
          history.push(isAuthenticated ? redirectTo : '/sign-in');
        }}
        className={classes.loginButton}
      >
        {isAuthenticated ? 'To dashboard' : 'Login'}
      </StyledButton>
    );
  }

  return (
    <Box className={clsx(classes.grow, classes.wrapper)}>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.bar} elevation={0}>
          <Toolbar disableGutters>
            <Container className={classes.container}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => toggleMenuOpen(!menuOpen)}
              >
                <MenuIcon style={{ color: menuOpen ? theme.palette.lightYellow.main : theme.palette.white }} />
              </IconButton>
              <img src={logoWhite} className={classes.logo} alt="inhome-logo" />
              <Box className={classes.grow} />
              <StyledTypography
                fontFamily="Poppins"
                className={classes.link}
                weight="bold"
                onClick={() => {
                  setModalTemplate(modalTemplates.requestDemo);
                  openModal();
                }}
              >
                Hire Accountants
              </StyledTypography>
              <StyledTypography
                className={classes.link}
                weight="bold"
                fontFamily="Poppins"
                onClick={() => {
                  setModalTemplate(modalTemplates.signUp);
                  openModal();
                }}
              >
                Apply As An Accountant
              </StyledTypography>
              {/* <StyledTypography
                className={classes.link}
                weight="bold"
                fontFamily="Poppins"
                onClick={() => {
                  setModalTemplate(modalTemplates.contactSupport);
                  openModal();
                }}
              >
                Contact Support
              </StyledTypography> */}
              {renderLoginButton()}
            </Container>
          </Toolbar>
          {menuOpen && renderMenu()}
        </AppBar>
      </ElevationScroll>
      <Box className={classes.main}>
        <Container>
          <StyledTypography fontSize={33} fontFamily="Poppins" type="h1" className={classes.title} fontWeight="bold">
            YourTutor
          </StyledTypography>
          <StyledTypography fontSize={14} fontFamily="Poppins" className={classes.projectDuration}>
            Connect. Study. Succeed.
          </StyledTypography>
          <Box className={classes.buttonGroup}>
            <StyledButton
              className={classes.button}
              variant="yellow"
              fontFamily="Poppins"
              onClick={() => {
                setModalTemplate(modalTemplates.requestDemo);
                openModal();
              }}
            >
              Hire Accountants
            </StyledButton>
            <StyledButton
              className={clsx(classes.oulined, classes.button)}
              variant="outlined-white"
              fontFamily="Poppins"
              onClick={() => {
                setModalTemplate(modalTemplates.signUp);
                openModal();
              }}
            >
              Apply as an Accountant
            </StyledButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Header;

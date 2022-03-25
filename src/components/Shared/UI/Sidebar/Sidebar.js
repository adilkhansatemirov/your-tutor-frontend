import React, { useContext } from 'react';
import { Drawer, List, ListItem, Box } from '@material-ui/core';
import clsx from 'clsx';
import useStyle from './Sidebar.style';
import { logout } from 'services/auth';
import { useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import logo from 'assets/icons/logo.svg';
import logoutIcon from 'assets/icons/logout.svg';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { AuthContext } from 'context/authContext';

function Sidebar({ sidebarItems }) {
  const classes = useStyle();
  const { pathname } = useLocation();
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const isActive = (path) => pathname.includes(path);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Box
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <img src={logo} className={classes.logo} alt="inhome-logo" />
      </Box>
      <List disablePadding className={classes.list}>
        {sidebarItems.map((item, index) => (
          <Link to={item.to} key={index} style={{ textDecoration: 'none' }}>
            <ListItem button className={clsx(classes.listItem, isActive(item.to) && classes.listItemActive)}>
              <Box className={classes.iconContainer}>
                <img src={item.icon} className={classes.icon} alt={item.name} />
              </Box>
              {item.name}
              {item.badge > 0 && (
                <Box className={classes.badge} component="span">
                  {item.badge}
                </Box>
              )}
            </ListItem>
          </Link>
        ))}

        <ListItem
          button
          className={classes.listItem}
          onClick={() => {
            logout();
            setUser(null);
            history.push('/');
          }}
        >
          <Box className={classes.iconContainer}>
            <img src={logoutIcon} className={classes.icon} alt="logout" />
          </Box>
          Logout
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;

import { makeStyles } from '@material-ui/core';

const DRAWER_WIDTH = 246;

export default makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
  },
  drawerPaper: {
    backgroundColor: '#043465',
    width: DRAWER_WIDTH,
  },
  logo: {
    width: '140px',
    height: '70px',
    marginTop: '22px',
    marginLeft: '20px',
  },
  list: {
    marginTop: '40px',
  },
  link: {
    textDecoration: 'none',
  },
  iconContainer: {
    width: '45px',
    height: '45px',
    backgroundColor: 'rgba(134, 169, 224, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    marginRight: '8px',
  },
  icon: {
    height: '22px',
  },
  listItem: {
    position: 'relative',
    borderRight: '4px solid transparent',
    color: '#fff',
  },
  listItemActive: {
    backgroundColor: 'rgba(0,0,0,1)',
    fontWeight: 700,
    borderRight: `5px solid rgba(24,145,218,1)`,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,1)',
    },
    '& $iconContainer': {
      backgroundColor: 'rgba(1,44,93,1)',
    },
  },
  badge: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#1891DA',
    color: '#fff',
    fontFamily: 'Poppins',
    width: '20px',
    height: '20px',
    textAlign: 'center',
    borderRadius: '50%',
    fontWeight: 'bold',
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F6F7FB',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
    borderRadius: '5px',
    width: `${DRAWER_WIDTH - 50}px`,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: '20px',
    paddingTop: '20px',
    paddingBottom: '20px',
    textTransform: 'none',
  },
  profileInfoText: {
    color: theme.palette.spaceBlue,
  },
  profilePhoto: {
    marginRight: '10px',
    width: '42px',
    height: '42px',
  },
}));

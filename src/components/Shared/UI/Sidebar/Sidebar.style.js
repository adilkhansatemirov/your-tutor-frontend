import { makeStyles } from '@material-ui/core';

const DRAWER_WIDTH = 246;

export default makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
  },
  drawerPaper: {
    backgroundColor: '#E8EDF7',
    width: DRAWER_WIDTH,
  },
  logo: {
    height: '100px',
    marginTop: '22px',
    marginLeft: '60px',
     backgroundColor: '#E8EDF7',
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
    color: '#0F2C4C',
    font: 'roboto',
    weight: '400px',
    size: "24px"
  },
  listItemActive: {
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    fontWeight: 700,
    borderRight: `3.87px solid #0F2C4C`,
    '&:hover': {
      backgroundColor: 'rgba(196, 196, 196, 0.24)',
    },
    '& $iconContainer': {
      backgroundColor: '#E8EDF7',
    },
  },
  badge: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#1891DA',
    color: '#fff'   ,
    fontFamily: 'R',
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

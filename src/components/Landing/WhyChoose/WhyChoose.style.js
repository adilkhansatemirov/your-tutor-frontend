import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  main: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  container: {
    overflow: 'hidden',
    paddingTop: '20px',
    paddingBottom: '0px',
    maxWidth: '1600px',
    paddingLeft:'0px',
    backgroundColor: '#E8EDF7',
  },
  title: {
    textAlign: 'center',
    marginBottom:'35px',
  },
  number: {
    display: 'flex',
    fontSize: '50px',
    fontWeight: 'Regular',
  },
  listItem: {
    marginBottom: '24px',
    paddingLeft:'255px',
  },
  itemInfo: {
    marginLeft: '23px',
  },
  itemTitle: {
    marginBottom: '0px',
  },

}));

import { makeStyles } from '@material-ui/core';

const getColor = (color, theme) => {
  switch (color) {
    case 'red':
      return 'red';
    case 'orange':
      return 'orange';
    case 'green':
      return theme.palette.green.main;
    default:
      return theme.palette.green.main;
  }
};

export default makeStyles((theme) => ({
  text: {
    color: ({ color }) => getColor(color, theme),
  },
  pill: {
    marginRight: '5px',
    width: '5px',
    height: '5px',
    border: ({ color }) => `1px solid ${getColor(color, theme)}`,
    borderRadius: '50%',
    backgroundColor: ({ color, complete }) => (complete ? getColor(color, theme) : 'transparent'),
  },
}));

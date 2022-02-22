import { Typography, makeStyles } from '@material-ui/core';

const getColor = (color, theme) => {
  switch (color) {
    case 'skyBlue':
      return theme.palette.skyBlue.main;
    case 'tomatoRed':
      return theme.palette.tomatoRed.main;
    case 'bluishBlack':
      return theme.palette.bluishBlack;
    case 'green':
      return theme.palette.green.main;
    case 'orange':
      return theme.palette.orange;
    case 'white':
      return theme.palette.white;
    case 'black':
      return theme.palette.black;
    default:
      return theme.palette.bluishBlack;
  }
};

const getFontWeight = (fontWeight) => {
  switch (fontWeight) {
    case 'normal':
      return 400;
    case 'medium':
      return 500;
    case 'bold':
      return 700;
    case 'black':
      return 900;
    default:
      return 400;
  }
};

const getFontSize = (fontSize) => {
  if (fontSize) return fontSize;
  return '14px';
};

const getFontFamily = (fontFamily) => {
  if (fontFamily) return fontFamily;
  return 'Roboto';
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: ({ color }) => getColor(color, theme),
    fontWeight: ({ fontWeight }) => getFontWeight(fontWeight),
    fontFamily: ({ fontFamily }) => getFontFamily(fontFamily),
    fontSize: ({ fontSize }) => getFontSize(fontSize),
    lineHeight: 1.2,
  },
}));

const StyledTypography = ({ color, fontWeight, fontFamily, fontSize, children, ...rest }) => {
  const classes = useStyles({ fontWeight, color, fontFamily, fontSize });

  return (
    <Typography classes={classes} {...rest}>
      {children}
    </Typography>
  );
};

export default StyledTypography;

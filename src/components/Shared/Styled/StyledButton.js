import { Button, makeStyles } from '@material-ui/core';

import theme from 'theme';

const getVariant = (variant) => {
  switch (variant) {
    case 'yellow':
      return {
        backgroundColor: theme.palette.lightYellow.main,
        border: 'none',
        hoverBackground: theme.palette.lightYellow.dark,
        color: theme.palette.black,
      };
    case 'outlined-dark-blue':
      return {
        backgroundColor: 'transparent',
        border: `2px solid ${theme.palette.bluishBlack}`,
        hoverBackground: 'rgba(0, 0, 0, 0.1)',
        color: theme.palette.bluishBlack,
      };
    case 'outlined-light-blue':
      return {
        backgroundColor: 'transparent',
        border: `2px solid ${theme.palette.bluishBlack}`,
        hoverBackground: 'rgba(0, 0, 0, 0.1)',
        color: theme.palette.bluishBlack,
      };
    case 'outlined-white':
      return {
        backgroundColor: 'transparent',
        border: `2px solid ${theme.palette.white}`,
        hoverBackground: 'rgba(0, 0, 0, 0.1)',
        color: theme.palette.white,
      };
    case 'inactive':
      return {
        backgroundColor: theme.palette.inactive,
        border: 'none',
        hoverBackground: theme.palette.inactive,
        color: theme.palette.black,
      };
    case 'blue':
      return {
        backgroundColor: theme.palette.colbatBlue.main,
        border: 'none',
        hoverBackground: theme.palette.colbatBlue.dark,
        color: theme.palette.white,
      };
    case 'light-blue':
      return {
        backgroundColor: theme.palette.skyBlue.main,
        border: 'none',
        hoverBackground: theme.palette.skyBlue.dark,
        color: theme.palette.white,
      };
    case 'dashed-light-blue':
      return {
        backgroundColor: theme.palette.coldWhite,
        border: `1px dashed ${theme.palette.skyBlue.main}`,
        height: '50px',
        color: theme.palette.skyBlue.main,
      };
    case 'red':
      return {
        backgroundColor: theme.palette.tomatoRed.main,
        border: 'none',
        hoverBackground: theme.palette.tomatoRed.dark,
        color: theme.palette.white,
      };
    case 'green':
      return {
        backgroundColor: theme.palette.green.main,
        border: 'none',
        hoverBackground: theme.palette.green.dark,
        color: theme.palette.white,
      };
    case 'text':
      return {
        backgroundColor: theme.palette.common.transparent,
        border: 'none',
        color: theme.palette.black,
      };
    default:
      return {
        backgroundColor: theme.palette.lightYellow.main,
        border: 'none',
        hoverBackground: theme.palette.lightYellow.dark,
        color: theme.palette.black,
      };
  }
};

const getSize = (size) => {
  switch (size) {
    case 'small':
      return { height: '30px', minWidth: '65px', fontSize: '10px' };
    case 'normal':
      return { height: '40px', minWidth: '65px', fontSize: '16px' };
    case 'large':
      return { height: '50px', minWidth: '80px', fontSize: '22px' };
    default:
      return { height: '40px', minWidth: '65px', fontSize: '16px' };
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
      return 700;
  }
};

const getColor = (color, variant) => {
  if (color) return color;
  return getVariant(variant).color;
};

const getFontFamily = (fontFamily) => {
  if (fontFamily) return fontFamily;
  return 'Roboto';
};

const getTextTransform = (textTransform) => {
  if (textTransform) return textTransform;
  return 'capitalize';
};

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 3,
    padding: '0 20px',
    background: ({ variant }) => getVariant(variant).backgroundColor,
    border: ({ variant }) => getVariant(variant).border,
    color: ({ color, variant }) => getColor(color, variant),
    height: ({ size }) => getSize(size).height,
    minWidth: ({ size }) => getSize(size).minWidth,
    '&:hover': {
      backgroundColor: ({ variant }) => getVariant(variant).hoverBackground,
    },
    '&:disabled': {
      backgroundColor: theme.palette.inactive,
      color: theme.palette.black,
      border: 'none',
    },
  },
  label: {
    textTransform: ({ textTransform }) => getTextTransform(textTransform),
    fontSize: ({ size }) => getSize(size).fontSize,
    fontFamily: ({ fontFamily }) => getFontFamily(fontFamily),
    fontWeight: ({ fontWeight }) => getFontWeight(fontWeight),
  },
}));

const StyledButton = ({ variant, size, fontFamily, fontWeight, textTransform, color, children, ...rest }) => {
  const classes = useStyles({ variant, size, fontFamily, fontWeight, textTransform, color });

  return (
    <Button classes={classes} {...rest}>
      {children}
    </Button>
  );
};

export default StyledButton;

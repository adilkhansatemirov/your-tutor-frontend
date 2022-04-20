import { Button, makeStyles } from '@material-ui/core';

import theme from 'theme';

const getVariant = (variant) => {
  switch (variant) {
    case 'light':
      return {
        backgroundColor: theme.palette.light.main,
        border: 'none',
        hoverBackground: theme.palette.light.dark,
        color: theme.palette.black,
      };
    case 'dark':
      return {
        backgroundColor: theme.palette.dark.main,
        border: 'none',
        hoverBackground: theme.palette.dark.dark,
        color: theme.palette.white,
      };
    case 'yellow':
      return {
        backgroundColor: theme.palette.yellow.main,
        border: 'none',
        hoverBackground: theme.palette.yellow.dark,
        color: theme.palette.spaceBlue,
      };
    case 'dark-blue':
      return {
        backgroundColor: theme.palette.blue.main,
        border: 'none',
        hoverBackground: theme.palette.blue.dark,
        color: theme.palette.white,
      };
    case 'transparent':
      return {
        backgroundColor: 'transparent',
        border: 'none',
        hoverBackground: 'transparent',
        color: theme.palette.dark.dark,
      };
    default:
      return {
        backgroundColor: theme.palette.light.main,
        border: 'none',
        hoverBackground: theme.palette.light.dark,
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
      backgroundColor: theme.palette.silverGray.main,
      color: theme.palette.black,
      border: 'none',
    },
  },
  label: {
    textTransform: ({ textTransform }) => getTextTransform(textTransform),
    fontSize: ({ size }) => getSize(size).fontSize,
    fontFamily: ({ fontFamily }) => getFontFamily(fontFamily),
    fontWeight: ({ fontWeight }) => getFontWeight(fontWeight),
    textDecoration: ({ variant }) => variant === 'transparent' ? 'underline' : 'none',
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

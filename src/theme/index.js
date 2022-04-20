import { createMuiTheme } from '@material-ui/core/styles';

// blue
const skyBlue = '#1891DA';
const skyBlueDark = '#1478B5';
const skyBluePale = '#E8EDF7';
const spaceBlue = '#2F3D40';

const green = 'green';

// red
const tomatoRed = '#FF3838';
const tomatoRedDark = '#D42F2F';
const tomatoRedPale = '#FFE2E2';

// b&w
const smokeWhite = '#F5F5F5';
const silverGray = '#E4E4E4';
const silverGrayDark = '#D4D4D4';
const black = '#000000';
const white = '#FFFFFF';
const smokeGray = '#474747';
const smokeGrayDark = '#303030';

const theme = createMuiTheme({
  palette: {
    light: {
      main: silverGray,
      dark: silverGrayDark,
    },
    dark: {
      main: smokeGray,
      dark: smokeGrayDark,
    },
    skyBlue: {
      main: skyBlue,
      dark: skyBlueDark,
      pale: skyBluePale,
    },
    spaceBlue,
    tomatoRed: {
      main: tomatoRed,
      dark: tomatoRedDark,
      pale: tomatoRedPale,
    },
    silverGray: {
      main: silverGray,
      dark: silverGrayDark,
    },
    green: {
      main: green,
    },
    blue: {
      main: '#0F2C4C',
      dark: '#09192b',
    },
    yellow: {
      main: '#FFC739',
      dark: '#ffb700',
    },
    lightYellow: {
      main: 'yellow',
    },
    smokeWhite,
    black,
    white,
  },
});

export default theme;

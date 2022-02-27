import { createMuiTheme } from '@material-ui/core/styles';

// blue
const skyBlue = '#1891DA';
const skyBlueDark = '#1478B5';
const skyBluePale = '#389CD9';

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
    tomatoRed: {
      main: tomatoRed,
      dark: tomatoRedDark,
      pale: tomatoRedPale,
    },
    silverGray: {
      main: silverGray,
      dark: silverGrayDark,
    },
    smokeWhite,
    black,
    white,
  },
});

export default theme;

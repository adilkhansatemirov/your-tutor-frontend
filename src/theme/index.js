import { createMuiTheme } from '@material-ui/core/styles';

// blue
const skyBlue = '#1891DA';
const skyBlueDark = '#1478B5';
const skyBluePale = '#389CD9';

const navyBlue = '#043465';
const navyBlueDark = '#032547';

const colbatBlue = '#004BA1';
const colbatBlueDark = '#003674';

const spaceBlue = '#0E3665';

const indigoBlue = '#021A33';

// yellow
const lightYellow = '#FDE427';
const goldYellow = '#FDC127';

const orange = '#FF9800';

// red
const tomatoRed = '#FF3838';
const tomatoRedDark = '#D42F2F';
const tomatoRedPale = '#FFE2E2';

// green
const green = '#50AE55';
const greenDark = '#3F8A43';

// b&w
const smokeWhite = '#F5F5F5';
const coldWhite = '#F6F7F9';
const textGray = '#A6A6A6';
const inactive = '#DADADA';
const bluishBlack = '#181D31';
const silverGrayPale = '#E9E9E9';
const silverGray = '#E4E4E4';
const silverGrayDark = '#D4D4D4';
const black = '#000000';
const white = '#FFFFFF';

const theme = createMuiTheme({
  palette: {
    spaceBlue,
    lightYellow: {
      main: lightYellow,
      dark: goldYellow,
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
    navyBlue: {
      main: navyBlue,
      dark: navyBlueDark,
    },
    green: {
      main: green,
      dark: greenDark,
    },
    colbatBlue: {
      main: colbatBlue,
      dark: colbatBlueDark,
    },
    silverGray: {
      pale: silverGrayPale,
      main: silverGray,
      dark: silverGrayDark,
    },
    bluishBlack,
    indigoBlue,
    orange,
    smokeWhite,
    coldWhite,
    inactive,
    textGray,
    black,
    white,
  },
});

export default theme;

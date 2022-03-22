import { Box, List, ListItem, Container } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import macBook from 'assets/images/macBook.png';

import useStyles from './AboutUs.style';

function AboutUs() {
    const classes = useStyles();
    return (
      <Box className={classes.main}>
        <img src={macBook} className={classes.macBook} alt= "mac-book"/>
        <Container className={classes.container}>
          <StyledTypography fontFamily="Roboto" className={classes.title} fontWeight="medium" fontSize={36} type="h1">
            About Us
          </StyledTypography>
          <StyledTypography fontFamily="Roboto" className={classes.description} fontWeight="regular" fontSize={22} type="h2">
          We are the group of people who want our future 
generations to succeed and be the best specialist of their profession. This is possible only if we group together for bigger achievements and keep bigger goals in mind and together with the best tutors get the best 
knowledge and strive for more.
          </StyledTypography>
        </Container>
      </Box>
    );
  }

export default AboutUs;

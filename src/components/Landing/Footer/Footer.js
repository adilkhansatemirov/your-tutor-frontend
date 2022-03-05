import { Box, Container, Divider } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import useStyles from './Footer.style';

import logoWhite from 'assets/icons/logo.svg';
import mailIcon from 'assets/icons/mail.png';
import phoneIcon from 'assets/icons/phone.png';
import locationIcon from 'assets/icons/location.png';

function Header() {
  const classes = useStyles();

  return (
    <Box className={classes.main}>
      <Container>
        <Box className={classes.contacts}>
          <img src={logoWhite} className={classes.logo} alt="inhome-logo" />
          <Box className={classes.grow} />
          <Box className={classes.contactsItem}>
            <Box className={classes.iconContainer}>
              <img className={classes.contactsIcon} src={mailIcon} alt="mail" />
            </Box>
            <StyledTypography fontFamily="Poppins" className={classes.text}>
              <a target="_blank" rel="noreferrer" href="mailto:hello@inhomeaccountants.com">
                hello@yourtutor.com
              </a>
            </StyledTypography>
          </Box>
          <Box className={classes.contactsItem}>
            <Box className={classes.iconContainer}>
              <img className={classes.contactsIcon} src={phoneIcon} alt="phone" />
            </Box>
            <StyledTypography fontFamily="Poppins" className={classes.text}>
              <a href="tel:(814) 853-3535">(814) 853-3535</a>
            </StyledTypography>
          </Box>
          <Box className={classes.contactsItem}>
            <Box className={classes.iconContainer}>
              <img className={classes.contactsIcon} src={locationIcon} alt="location" />
            </Box>
            <StyledTypography fontFamily="Poppins" className={classes.text}>
              Your Tutor 2022
            </StyledTypography>
          </Box>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.bottom}>
          <Box className={classes.links}>
            <StyledTypography fontFamily="Poppins" className={classes.linkItem}>
              Privacy Policy
            </StyledTypography>
            <StyledTypography fontFamily="Poppins" className={classes.linkItem}>
              Terms of Use
            </StyledTypography>
            <StyledTypography fontFamily="Poppins" className={classes.linkItem}>
              Cookie Policy
            </StyledTypography>
          </Box>
          <Box className={classes.grow} />
          <StyledTypography fontFamily="Poppins" className={classes.rights}>
            2020, All right reserved
          </StyledTypography>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;

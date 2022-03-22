import { Box, Container, Divider } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import useStyles from './Footer.style';

import logo from 'assets/images/logo.png';
import instagramIcon from 'assets/icons/instagram@3x.png';
import googleIcon from 'assets/icons/google.png';
import telegramIcon from 'assets/icons/telegram@3x.png';
import phoneIcon from 'assets/icons/phoneIcon.png';

function Header() {
  const classes = useStyles();

  return (
    <Box className={classes.main}>
      <Container className={classes.container}>
        <Box className={classes.contacts}>
          <img src={logo} className={classes.logo} alt="inhome-logo" />
          
          
          <Box className={classes.contactsMain}>
          <Box className={classes.contactsText}>
            <StyledTypography fontSize={36} fontFamily="Roboto" className={classes.text} weight="meduim">
             Our contacts
            </StyledTypography>
          </Box>
          <Box className={classes.contactsInfo}>
            <Box className={classes.contactsItem}>
              <Box className={classes.iconContainer}>
                <img className={classes.contactsIcon} src={phoneIcon} alt="phone" />
                <StyledTypography fontSize={16} fontFamily="Roboto" className={classes.text}>
                <u><a href="tel:+77074578647">+77074578647</a></u>
                </StyledTypography>
              </Box>
              <Box className={classes.iconContainer}>
                <img className={classes.contactsIcon} src={phoneIcon} alt="phone" />
                <StyledTypography fontSize={16} fontFamily="Roboto" className={classes.text}>
                <u><a href="tel:+77074578647">+77074578647</a></u>
                </StyledTypography>
              </Box>
            </Box>

            <Box className={classes.socialMediaContact}>
              <Box className={classes.socialsIconContainer}>
                <img className={classes.socialMediaIcon} src={instagramIcon} alt="instagram" />
              </Box>
              <Box className={classes.socialsIconContainer}>
                <img className={classes.socialMediaIcon} src={telegramIcon} alt="telegram" />
              </Box>
              <Box className={classes.socialsIconContainer}>
              <img className={classes.socialMediaIcon} src={googleIcon} alt="google" />
              </Box>
            </Box>
          </Box>
          </Box>
         
        </Box>

        <Box className={classes.bottom} >
          <StyledTypography fontSize={14} fontFamily="Roboto" className={classes.rights}>
           ©2022 All rights reserved
          </StyledTypography>
        </Box>

      </Container>
    </Box>
  );
}

export default Header;

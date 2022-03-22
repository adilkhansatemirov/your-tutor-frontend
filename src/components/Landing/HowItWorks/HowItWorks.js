import { Box, List, ListItem, Container } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import useStyles from './HowItWorks.style';
import signUp from 'assets/images/signUp.png';
import findMatch from 'assets/images/findMatch.png';
import book from 'assets/images/book.png';

const list1 = [
  {
    id: 1,
    icon: signUp, 
    title: 'Sign Up',
  },
  {
    id: 2,
    icon: findMatch,
    title: 'Find your match',
  },
  {
    id: 3,
    icon: book,
    title: 'Learn/Teach',
  },
];

function HowItWorks() {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Container className={classes.container}>
        <StyledTypography fontFamily="Roboto" className={classes.title} fontWeight="medium" fontSize={33} type="h1">
          How it works?
        </StyledTypography>
        <List style={{ display: 'flex' }}>
          {list1.map((item) => (
            <ListItem className={classes.listItem} key={item.id} disableGutters>
              <Box className={classes.iconContainer}>
              <img className={classes.itemIcon} src={item.icon} alt="item icon" />
              </Box>
              <Box className={classes.itemInfo}>
                <StyledTypography
                  fontFamily="Roboto"
                  fontSize={22}
                  className={classes.itemTitle}
                  type="h2"
                  fontWeight="Regular"
                >
                  {item.title}
                </StyledTypography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default HowItWorks;

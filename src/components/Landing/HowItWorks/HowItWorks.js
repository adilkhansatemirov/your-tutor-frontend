import { Box, List, ListItem, Container } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import useStyles from './HowItWorks.style';

const list1 = [
  {
    id: 1,
    number: 1,
    title: 'Sign Up',
  },
  {
    id: 2,
    number: 2,
    title: 'Find your match',
  },
  {
    id: 3,
    number: 3,
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
              <StyledTypography fontFamily="Roboto" className={classes.number}>
                {item.number}
              </StyledTypography>
              <Box className={classes.itemInfo}>
                <StyledTypography
                  fontFamily="Roboto"
                  fontSize={20}
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

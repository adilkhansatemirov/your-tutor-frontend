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
        <StyledTypography fontFamily="Poppins" className={classes.title} fontWeight="bold" fontSize={33} type="h1">
          How It Works
        </StyledTypography>
        <Box className={classes.stick} />
        <List style={{ display: 'flex' }}>
          {list1.map((item) => (
            <ListItem className={classes.listItem} key={item.id} disableGutters>
              <StyledTypography fontFamily="Poppins" className={classes.number}>
                {item.number}
              </StyledTypography>
              <Box className={classes.itemInfo}>
                <StyledTypography
                  fontFamily="Poppins"
                  fontSize={30}
                  className={classes.itemTitle}
                  type="h2"
                  fontWeight="bold"
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

import { Box, List, ListItem, Container } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';



import useStyles from './WhyChoose.style';


const list1 = [
  {
    id: 1,
    number: 1,
    title: 'Verification required',
  },
  {
    id: 2,
    number: 2,
    title: 'Safe money transitions',
  },
  {
    id: 3,
    number: 3,
    title: '9/10 of our clients are satisfied',
  },
];
const list2 = [
  {
    id: 4,
    number: 4,
    title: 'The best studying materials ',
  },
  {
    id: 5,
    number: 5,
    title: 'Experts of its own subjects',
  },
  {
    id: 6,
    number: 6,
    title: 'Lawfully verified deals',
    },
];



function WhyChoose() {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Container className={classes.container}>
        <StyledTypography fontFamily="Roboto" className={classes.title} fontWeight="medium" fontSize={33} type="h1">
          Why choose us?
        </StyledTypography>
        
        <Box style={{ display: 'flex' }}>
          <List>
            {list1.map((item) => (
              <ListItem className={classes.listItem} key={item.id} disableGutters>
                <StyledTypography fontFamily="Roboto" className={classes.number}>
                  {item.number}
                </StyledTypography>
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
          <List>
            {list2.map((item) => (
              <ListItem className={classes.listItem} key={item.id} disableGutters>
                <StyledTypography fontFamily="Roboto" className={classes.number}>
                  {item.number}
                </StyledTypography>
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
        </Box>
      </Container>
    </Box>
  );
}



export default WhyChoose;

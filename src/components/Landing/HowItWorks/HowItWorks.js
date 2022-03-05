import { Box, List, ListItem, Container } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import useStyles from './HowItWorks.style';

const list1 = [
  {
    id: 1,
    number: 1,
    title: 'Define your Project',
    description: 'One of our CPAs will work with you to understand your needs and business goals',
  },
  {
    id: 2,
    number: 2,
    title: 'Interview Hand-Selected candidates',
    description: 'We recommend up to 3 vetted and hand selected candidates that you can interview',
  },
  {
    id: 3,
    number: 3,
    title: 'Work with U.S. Accountants',
    description: 'Collaborate with top U.S. based Accountants on your project',
  },
];

const list2 = [
  {
    id: 4,
    number: 4,
    title: 'Review and Pay',
    description:
      "After you review and authorize the work, payment is automatically transmitted to the accountant. We prepare and send 1099's for you",
  },
  {
    id: 5,
    number: 5,
    title: 'Work with U.S. Accountants',
    description: 'Collaborate with top U.S. based Accountants on your project',
  },
  {
    id: 6,
    number: 6,
    title: 'Review and Pay',
    description:
      "After you review and authorize the work, payment is automatically transmitted to the accountant. We prepare and send 1099's for you",
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
        <StyledTypography fontFamily="Poppins" fontSize={20} className={classes.project_duration} type="h5">
          InHomeAccountants is a network of top freelance accountants, tax professionals and auditors available for
          hire.
        </StyledTypography>
        <Box style={{ display: 'flex' }}>
          <List>
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
                  <StyledTypography fontSize={20} fontFamily="Poppins" type="h5">
                    {item.description}
                  </StyledTypography>
                </Box>
              </ListItem>
            ))}
          </List>
          <List>
            {list2.map((item) => (
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
                  <StyledTypography fontSize={20} fontFamily="Poppins" type="h5">
                    {item.description}
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

export default HowItWorks;

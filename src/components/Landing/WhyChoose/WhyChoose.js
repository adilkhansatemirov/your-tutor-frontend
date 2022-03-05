import { Box, Paper, Grid, Container } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import useStyles from './WhyChoose.style';

import userIcon from 'assets/icons/user.png';
import mapIcon from 'assets/icons/map.png';
import earIcon from 'assets/icons/ear.png';
import calendarIcon from 'assets/icons/calendar.png';
import homeIcon from 'assets/icons/home.png';

const list = [
  {
    id: 1,
    icon: userIcon,
    title: 'Our CEO walks in your shoes',
    description:
      'Randy started out his career as a staff accountant in the city of Pittsburgh which eventually led him to a partner in a regional firm. He is all too familiar with the everyday stressors in the industry and with InHome Accountants you finally get to walk in a new pair of shoes.',
    md: 4,
    sm: 12,
  },
  {
    id: 2,
    icon: mapIcon,
    title: 'Connections',
    description:
      'We are connecting you to the world. From the small town of Meadville, PA to the sandy beaches in Miami, FL, Accountants have the ability to choose where and when they want to work. No matter the size of your firm, you will be able to compete just as the Big 4 do.',
    md: 4,
    sm: 12,
  },
  {
    id: 3,
    icon: earIcon,
    title: 'We listen',
    description:
      "We have dedicated the last three years to listening to Accountants and CPA's alike and to learn the everyday struggles and stressors of the industry they face. From millennials to baby boomers, we have developed InHome Accountants to empower and embrace change for the better of the industry.",
    md: 4,
    sm: 12,
  },
  {
    id: 4,
    icon: calendarIcon,
    title: 'Looking into the future, while remembering the past',
    description:
      'We continue to preserve the quality and high ethics of the profession, but acknowledge through the right technology you can grow your practice.',
    md: 6,
    sm: 12,
  },
  {
    id: 5,
    icon: homeIcon,
    title: 'Genuine',
    description:
      'Our company is fueled by the desire to help the accounting industry spend more time with their family and increase their earning potential. Our support center is there to help you with all of your questions.',
    md: 6,
    sm: 12,
  },
];

function WhyChoose() {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Container className={classes.container}>
        <StyledTypography fontSize={33} fontFamily="Poppins" className={classes.title} fontWeight="bold" type="h1">
          Why Choose
          <br />
          InHome Accountants
        </StyledTypography>
        <Box className={classes.stick} />
        <Grid container alignItems="stretch" className={classes.list} spacing={4}>
          {list.map((item) => (
            <Grid item key={item.id} sm={item.sm} md={item.md}>
              <Paper className={classes.paper}>
                <Box className={classes.paperHeader}>
                  <Box className={classes.iconContainer}>
                    <img className={classes.itemIcon} src={item.icon} alt="item icon" />
                  </Box>
                  <StyledTypography fontFamily="Poppins" className={classes.itemTitle} type="h4" weight="bold">
                    {item.title}
                  </StyledTypography>
                </Box>
                <Box className={classes.itemInfo}>
                  <StyledTypography fontFamily="Poppins" className={classes.itemText}>
                    {item.description}
                  </StyledTypography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default WhyChoose;

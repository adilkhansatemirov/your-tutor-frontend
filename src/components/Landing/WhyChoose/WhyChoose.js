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
    title: 'Reason 1',
    description: 'Hello world what a beautiful day',
    md: 4,
    sm: 12,
  },
  {
    id: 2,
    icon: mapIcon,
    title: 'Reason 2',
    description: 'Hello world what a beautiful day',
    md: 4,
    sm: 12,
  },
  {
    id: 3,
    icon: earIcon,
    title: 'Reason 3',
    description: 'Hello world what a beautiful day',
    md: 4,
    sm: 12,
  },
  {
    id: 4,
    icon: calendarIcon,
    title: 'Reason 4',
    description: 'Hello world what a beautiful day',
    md: 6,
    sm: 12,
  },
  {
    id: 5,
    icon: homeIcon,
    title: 'Reason 5',
    description:'Hello world what a beautiful day',
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
          Your Tutor
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

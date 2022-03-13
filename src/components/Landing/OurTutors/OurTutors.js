import { Box, Paper, Grid, Container } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import useStyles from './OurTutors.style';

import userIcon from 'assets/icons/user.png';
import mapIcon from 'assets/icons/map.png';
import earIcon from 'assets/icons/ear.png';
import calendarIcon from 'assets/icons/calendar.png';
import homeIcon from 'assets/icons/home.png';

const list = [
  {
    id: 1,
    icon: userIcon,
    title: 'Alina Ni',
    description:
      'The best teacher I had so far. I’ve come to understanding so much I hated at schoull. She really knows how to motivate her/his students. She is great at building confidence and keeping lessons fun and engaging through a variety of activities that improve conversation, writing, and reading skills.',
    md: 6,
    sm: 12,
  },
  {
    id: 2,
    icon: mapIcon,
    title: 'Konstantin Rybakov',
    description:
      'I have learned so much in my classes with. He paces the class just right so you feel challenged but not overwhelmed. So many other classes you just read from a text book but in his classes asks questions and gets the students to respond which is both fun and promotes faster learning. He is patient and eager to help. I’m thrilled to have found his class!',
    md: 6,
    sm: 12,
  },
  
];

function OurTutors() {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Container className={classes.container}>
        <StyledTypography fontSize={33} fontFamily="Roboto" className={classes.title} fontWeight="Medium" type="h1">
          Our best tutors
        </StyledTypography>
        <Grid container alignItems="stretch" className={classes.list} spacing={4}>
          {list.map((item) => (
            <Grid item key={item.id} sm={item.sm} md={item.md}>
              <Paper className={classes.paper}>
                <Box className={classes.paperHeader}>
                  
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

export default OurTutors;
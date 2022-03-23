import { Box, Paper, Grid, Container } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import useStyles from './OurTutors.style';

import starsIcon from 'assets/icons/stars.png';
import girlImg from 'assets/images/girl.png';
import boylImg from 'assets/images/boy.png';


function OurTutors() {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Container className={classes.container}>
        <StyledTypography fontSize={36} fontFamily="Roboto" className={classes.title} fontWeight="meduim" type="h1">
          Our best tutors
        </StyledTypography>
        
        <Container className={classes.list}>
          <img src={girlImg} className={classes.girlImg} alt= "girlImg"/>
            <Paper className={classes.paper}>
              <StyledTypography fontSize={24} fontFamily="Roboto" className={classes.itemTitle} type="h4" weight="regular">
                Alina Ni
              </StyledTypography>
              <Box className={classes.paperHeader}>
                <Box className={classes.iconContainer}>
                  <img src={starsIcon} className={classes.starsIcon}/>
                </Box>
                <StyledTypography fontSize={14} fontFamily="Roboto" className={classes.itemRating}>
                   4.87
                </StyledTypography>
              </Box>
                <Box className={classes.itemInfo}>
                  <StyledTypography fontSize={18} fontFamily="Roboto" className={classes.itemText}>
                   The best teacher I had so far. I’ve come to understanding so much I hated at schoull. She really knows how to motivate her/his students. She is great at building confidence and keeping lessons fun and engaging through a variety of activities that improve conversation, writing, and reading skills.
                  </StyledTypography>
                  <StyledTypography fontSize={14} fontFamily="Roboto" className={classes.authorInfo}>
                    Karina Rysbekova, 16
                  </StyledTypography>
                </Box>
            </Paper>

            <Paper className={classes.paperSecond}>
              <StyledTypography fontSize={24} fontFamily="Roboto" className={classes.itemTitle} type="h4" weight="regular">
               Konstantin Rybakov
              </StyledTypography>
              <Box className={classes.paperHeader}>
                <Box className={classes.iconContainer}>
                  <img src={starsIcon} className={classes.starsIcon} alt= "item icon"/>
                </Box>
                <StyledTypography fontSize={14} fontFamily="Roboto" className={classes.itemRating}>
                  4.65
                </StyledTypography>
              </Box>
              <Box className={classes.itemInfo}>
                <StyledTypography fontSize={18} fontFamily="Roboto" className={classes.itemText}>
                 I have learned so much in my classes with. He paces the class just right so you feel challenged but not overwhelmed. So many other classes you just read from a text book but in his classes asks questions and gets the students to respond which is both fun and promotes faster learning. He is patient and eager to help. I’m thrilled to have found his class!
                </StyledTypography>
                <StyledTypography fontSize={14} fontFamily="Roboto" className={classes.authorInfo}>
                 Karina Rysbekova, 16
                </StyledTypography>
              </Box>
              </Paper>
             <img src={boylImg} className={classes.boylImg} alt= "boylImg"/>
        </Container>
      </Container>
    </Box>
  );
}

export default OurTutors;
import { Box, List, ListItem, Container } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';

import map from 'assets/images/map.png';

import useStyles from './Platform.style';

function Platform() {
    const classes = useStyles();
    return (
      <Box className={classes.main}>
        <Container className={classes.container}>
          <StyledTypography fontFamily="Roboto" className={classes.title} fontWeight="medium" fontSize={36} type="h1">
          #1 Kazakhstani platform
          </StyledTypography>
        </Container>
        <img src={map} className={classes.map} alt= "map"/>
      </Box>
    );
  }

export default Platform;
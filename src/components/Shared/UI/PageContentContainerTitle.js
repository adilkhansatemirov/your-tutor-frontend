import { Box } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { makeStyles } from '@material-ui/core/styles';
import arrowLeftIcon from 'assets/icons/arrow-left.svg';

const useStyles = makeStyles(() => ({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  backButton: {
    minWidth: '22px',
    height: '22px',
    marginRight: '10px',
  },
}));

function PageContentContainerTitle({ title, handleNavigateBack }) {
  const classes = useStyles();
  return (
    <Box className={classes.titleContainer}>
      <StyledButton onClick={handleNavigateBack} variant="text" className={classes.backButton}>
        <img src={arrowLeftIcon} alt="arrow-left" />
      </StyledButton>
      <StyledTypography type="h3" fontSize="18px" weight="bold">
        {title}
      </StyledTypography>
    </Box>
  );
}

export default PageContentContainerTitle;

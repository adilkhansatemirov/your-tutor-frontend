import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  title: {
    marginTop: '20px',
    marginBottom: '12px',
  },
}));

function PageTitle({ title }) {
  const classes = useStyles();
  return (
    <StyledTypography className={classes.title} variant="h1" fontSize={35} fontWeight="bold">
      {title}
    </StyledTypography>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;

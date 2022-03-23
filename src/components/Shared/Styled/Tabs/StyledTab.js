import { Box, makeStyles, Tab } from '@material-ui/core';
import StyledTypography from '../StyledTypography';
import theme from 'theme';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 0,
    minHeight: 0,
    padding: '0 20px',
    borderBottom: '2px solid #ccc',
  },
}));

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

function StyledTab({ text, count, index, ...rest }) {
  const classes = useStyles();
  return (
    <Tab
      classes={classes}
      label={
        <Box display="flex" alignItems="center">
          <StyledTypography
            fontSize="15px"
            fontFamily="Rubik"
            fontWeight="medium"
            style={{ textTransform: 'none', padding: '10px 0' }}
          >
            {text}
          </StyledTypography>
          {(count && count !== 0) ? (
            <Box
              component="span"
              style={{
                marginLeft: '7px',
                border: `1px solid ${theme.palette.silverGray.pale}`,
                borderRadius: '50%',
                padding: '0 7px',
                fontSize: '10px',
              }}
            >
              {count}
            </Box>
          ) : null}
        </Box>
      }
      {...a11yProps(index)}
      {...rest}
    />
  );
}

export default StyledTab;

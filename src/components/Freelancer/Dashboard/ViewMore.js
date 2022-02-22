import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { Link } from 'react-router-dom';
import arrowRightIcon from 'assets/icons/arrow-right-blue.svg';

function ViewMore({ link, list, listName }) {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <StyledTypography style={{ display: 'flex', alignItems: 'center' }} fontWeight="bold">
        {list.length - 3 > 0 ? `VIEW ${list.length - 3} MORE` : `VIEW ${listName.toUpperCase()}`}
        <img style={{ marginLeft: '5px' }} src={arrowRightIcon} alt="arrow-right" />
      </StyledTypography>
    </Link>
  );
}
export default ViewMore;

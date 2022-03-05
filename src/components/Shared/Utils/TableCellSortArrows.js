import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import sortArrowsIcons from 'assets/icons/sort-arrows.svg';

function TableCellSortArrows({ sortKey, currentSortKey, currentSortDirection }) {
  return (
    <>
      {currentSortKey === sortKey ? (
        currentSortDirection === 'desc' ? (
          <ArrowDropDownIcon />
        ) : (
          <ArrowDropUpIcon />
        )
      ) : (
        <img src={sortArrowsIcons} alt="sort icon" style={{ width: '23px' }} />
      )}
    </>
  );
}

export default TableCellSortArrows;

import { SnackbarContext } from 'context/snackbarContext';
import { useContext } from 'react';

const useSort = ({ params, setParams, fetchData }) => {
  const { showSnackbar } = useContext(SnackbarContext);

  const handleChangeSortParams = (sort_key) => {
    let newParams = null;
    if (sort_key !== params.sort_key) {
      newParams = { ...params, sort_key, sort_direction: 'asc', page: 1 };
      setParams(newParams);
      fetchData(newParams);
      return;
    }

    if (params.sort_direction === 'asc') {
      newParams = { ...params, sort_key, sort_direction: 'desc', page: 1 };
    } else if (params.sort_direction === 'desc') {
      showSnackbar('Default sort by date applied', 'info');
      newParams = { ...params, sort_key: null, sort_direction: null, page: 1 };
    }
    setParams(newParams);
    fetchData(newParams);
  };

  return handleChangeSortParams;
};

export default useSort;

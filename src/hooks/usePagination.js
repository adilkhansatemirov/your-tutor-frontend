import { SnackbarContext } from 'context/snackbarContext';
import { useContext } from 'react';

const usePagination = ({
  pagination,
  setPagination,
  params,
  setParams,
  data,
  getData,
  setData,
  setLoading,
  setCounters,
}) => {
  const { showSnackbar } = useContext(SnackbarContext);
  const fetchMore = () => {
    const newParams = { ...params, page: pagination.page + 1 };
    setParams(newParams);
    getData(newParams)
      .then((response) => {
        setCounters(response.data.meta.counters);
        setPagination(response.data.meta.pagination);
        setData([...data, ...response.data.list]);
        setLoading(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setLoading(false);
      });
  };

  return fetchMore;
};

export default usePagination;

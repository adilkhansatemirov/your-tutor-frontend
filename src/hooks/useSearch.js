import { useState } from 'react';
import axios from 'axios';

const useSearch = ({ params, setParams, fetchData, setLoading }) => {
  const [cancelToken, setCancelToken] = useState(null);

  const handleSearch = (event) => {
    const searchString = event.target.value;
    if (searchString.length < 3 && searchString.length !== 0) return;

    setLoading(true);
    const newParams = { ...params, search: searchString, page: 1 };
    setParams(newParams);
    if (cancelToken) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    const cancelTokenSourse = axios.CancelToken.source();
    setCancelToken(cancelTokenSourse);
    fetchData(newParams, cancelTokenSourse.token);
  };

  return handleSearch;
};

export default useSearch;

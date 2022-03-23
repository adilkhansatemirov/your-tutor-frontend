import { useState } from 'react';

const useFilter = ({ params, setParams, fetchData, filterBy }) => {
  const [filterValue, setFilterValue] = useState('all');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    const newParams = { ...params, [filterBy]: value, page: 1 };
    if (value === 'all') {
      delete newParams[filterBy];
    }
    setFilterValue(event.target.value);
    setParams(newParams);
    fetchData(newParams);
  };

  return {
    filterValue,
    handleFilterChange,
  };
};

export default useFilter;

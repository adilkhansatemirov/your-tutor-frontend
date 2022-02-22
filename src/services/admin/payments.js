import api from '../api';

export const getPayments = (params, cancelToken) => {
  return api.get('/admin/payments', { params, cancelToken });
};

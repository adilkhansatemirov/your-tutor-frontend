import api from '../api';

export const getInvoices = (params) => {
  return api.get('/student/invoices', { params });
};

export const getInvoice = (id) => {
  return api.get(`/student/invoices/${id}`);
};

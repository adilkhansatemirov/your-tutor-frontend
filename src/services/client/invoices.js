import api from '../api';

export const getInvoices = (params) => {
  return api.get('/client/invoices', { params });
};

export const getInvoice = (id) => {
  return api.get(`/client/invoices/${id}`);
};

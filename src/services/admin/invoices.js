import api from '../api';

export const getInvoices = (params, cancelToken) => {
  return api.get('/admin/invoices', { params, cancelToken });
};

export const getInvoice = (id) => {
  return api.get(`/admin/invoices/${id}`);
};

export const createIvoice = (invoice) => {
  return api.post('/admin/invoices', invoice);
};

export const updateIvoice = (id, invoice) => {
  return api.put(`/admin/invoices/${id}`, invoice);
};

export const chargeClient = (invoiceId) => {
  return api.post(`/admin/invoices/${invoiceId}/charge_client`);
};

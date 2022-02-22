import api from '../api';

export const getClients = (params, cancelToken) => {
  return api.get('/admin/client_details', { params, cancelToken });
};

export const getAllClients = () => {
  return api.get('/admin/client_details/all');
};

export const createClient = (data) => {
  return api.post('/admin/client_details', data);
};

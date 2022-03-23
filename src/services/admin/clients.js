import api from '../api';

export const getClients = (params, cancelToken) => {
  return api.get('/admin/student_details', { params, cancelToken });
};

export const getAllClients = () => {
  return api.get('/admin/student_details/all');
};

export const createClient = (data) => {
  return api.post('/admin/student_details', data);
};

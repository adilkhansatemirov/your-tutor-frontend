import api from '../api';

export const getFreelancers = (params, cancelToken) => {
  return api.get('/admin/tutor_details', { params, cancelToken });
};

export const getFreelancer = (id) => {
  return api.get(`/admin/freelancers/${id}`);
};

export const getAllFreelancers = () => {
  return api.get('/admin/tutor_details/all');
};

export const updateFreelancerDetails = (data) => {
  return api.put(`/admin/tutor_details/${data.id}`, data);
};

export const uploadResume = (formData) => {
  return api.post(`/admin/freelancers/${formData.get('user_id')}/upload_resume`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const qualifyFreelancer = (freelancerId) => {
  return api.post(`/admin/freelancers/${freelancerId}/qualify`);
};

export const deleteFreelancer = (freelancerId) => {
  return api.delete(`/admin/freelancers/${freelancerId}`);
};

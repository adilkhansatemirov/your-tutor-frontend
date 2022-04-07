import api from '../api';

export const getOpportunities = () => {
  return api.get('/tutor/opportunities');
};

export const getOpportunity = (id) => {
  return api.get(`/tutor/opportunities/${id}`);
};

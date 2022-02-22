import api from '../api';

export const getOpportunities = () => {
  return api.get('/freelancer/opportunities');
};

export const getOpportunity = (id) => {
  return api.get(`/freelancer/opportunities/${id}`);
};

import api from '../api';

export const updateBidsStatus = (id, projectBid) => {
  return api.put(`/freelancer/project_bids/${id}`, projectBid);
};

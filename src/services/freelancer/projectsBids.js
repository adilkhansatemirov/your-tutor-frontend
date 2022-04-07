import api from '../api';

export const updateBidsStatus = (id, projectBid) => {
  return api.put(`/tutor/project_bids/${id}`, projectBid);
};

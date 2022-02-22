import api from '../api';

export const blockUser = (userId) => {
  return api.post(`/admin/users/${userId}/block`);
};

export const unblockUser = (userId) => {
  return api.post(`/admin/users/${userId}/unblock`);
};

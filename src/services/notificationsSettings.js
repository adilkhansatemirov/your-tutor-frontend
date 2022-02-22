import api from './api';

export const getAllowedNotifications = (userId) => {
  return api.get(`/allowed_notifications/${userId}`);
};

export const putAllowedNotifications = (userId, data) => {
  return api.put(`/allowed_notifications/${userId}`, data);
};

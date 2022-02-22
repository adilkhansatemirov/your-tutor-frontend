import api from './api';

export const resetPassword = (data) => {
  return api.post('/authentication/reset_password', data);
};

export const resetPasswordByToken = (data) => {
  return api.post('/authentication/reset_password_by_token', data);
};

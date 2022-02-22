import api from './api';

export const sendEmailToAdmin = (data) => {
  return api.post('/support/send_email_to_admin', data);
};

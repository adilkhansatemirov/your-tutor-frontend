import api from '../api';

export const uploadResume = (formData) => {
  return api.post('/tutor/tutors/upload_resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getFreelancer = () => {
  return api.get('/tutor/tutors/current');
};

export const updateFreelancerDetails = (data) => {
  return api.post('/tutor/tutors/update_freelancer_detail', data);
};

export const connectStripe = (code) => {
  return api.post('/tutor/tutors/connect_stripe', code);
};

export const generateExpressDashboardLink = () => {
  return api.post('/tutor/tutors/generate_express_dashboard_link');
};

export const finishAllSteps = () => {
  return api.post('/tutor/tutors/finish_all_steps');
};

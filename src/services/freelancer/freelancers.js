import api from '../api';

export const uploadResume = (formData) => {
  return api.post('/freelancer/freelancers/upload_resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getFreelancer = () => {
  return api.get('/freelancer/freelancers/current');
};

export const updateFreelancerDetails = (data) => {
  return api.post('/freelancer/freelancers/update_freelancer_detail', data);
};

export const connectStripe = (code) => {
  return api.post('/freelancer/freelancers/connect_stripe', code);
};

export const generateExpressDashboardLink = () => {
  return api.post('/freelancer/freelancers/generate_express_dashboard_link');
};

export const finishAllSteps = () => {
  return api.post('/freelancer/freelancers/finish_all_steps');
};

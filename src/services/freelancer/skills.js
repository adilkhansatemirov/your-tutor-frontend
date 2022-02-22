import api from '../api';

export const getSkills = (category = null) => {
  return api.get('/freelancer/freelancer_skills', { params: { category } });
};

export const getFreelancerSkills = () => {
  return api.get('/freelancer/freelancer_skills/all');
};

export const updateSkills = (freelancerSkills) => {
  return api.post('/freelancer/freelancer_skills/update_skills', freelancerSkills);
};

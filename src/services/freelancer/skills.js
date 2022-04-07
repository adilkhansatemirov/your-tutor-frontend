import api from '../api';

export const getSkills = (category = null) => {
  return api.get('/tutor/tutors_skills', { params: { category } });
};

export const getFreelancerSkills = () => {
  return api.get('/tutor/tutors_skills/all');
};

export const updateSkills = (freelancerSkills) => {
  return api.post('/tutor/tutors_skills/update_skills', freelancerSkills);
};

import api from '../api';

export const getFreelancerSkills = (id) => {
  return api.get(`/admin/freelancer_skills/${id}`);
};

export const updateFreelancerSkills = (id, freelancerSkills) => {
  return api.put(`/admin/freelancer_skills/${id}`, freelancerSkills);
};

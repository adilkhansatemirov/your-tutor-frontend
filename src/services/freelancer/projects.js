import api from '../api';

export const getProjects = () => {
  return api.get('/freelancer/projects');
};

export const getProject = (id) => {
  return api.get(`/freelancer/projects/${id}`);
};

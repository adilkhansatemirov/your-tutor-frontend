import api from '../api';

export const getProjects = () => {
  return api.get('/tutor/projects');
};

export const getProject = (id) => {
  return api.get(`/tutor/projects/${id}`);
};

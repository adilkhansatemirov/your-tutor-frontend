import api from '../api';

export const createProject = (projectData) => {
  return api.post('/client/projects', projectData);
};

export const getProjects = (params) => {
  return api.get('/client/projects', { params });
};

export const getProject = (id) => {
  return api.get(`/client/projects/${id}`);
};

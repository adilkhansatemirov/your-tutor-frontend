import api from '../api';

export const createProject = (projectData) => {
  return api.post('/student/projects', projectData);
};

export const getProjects = (params) => {
  return api.get('/student/projects', { params });
};

export const getProject = (id) => {
  return api.get(`/student/projects/${id}`);
};

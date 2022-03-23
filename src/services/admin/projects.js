import api from '../api';

export const getProjects = (params, cancelToken) => {
  return api.get('/admin/projects', { params, cancelToken });
};

export const getProject = (id) => {
  return api.get(`/admin/projects/${id}`);
};

export const assignFreelancerToProject = (id, project_data) => {
  return api.post(`/admin/projects/${id}/assign_freelancer`, { project_data });
};

export const startBids = (id, projectData) => {
  return api.post(`/admin/projects/${id}/start_bids`, projectData);
};

export const createProject = (project_data) => {
  return api.post('/admin/projects', { project_data });
};

export const updateProject = (id, project_data) => {
  return api.put(`/admin/projects/${id}`, { project_data });
};

export const getUninvoicedTimeEntries = (id) => {
  return api.get(`/admin/projects/${id}/uninvoiced_time_entries`);
};

export const payFreelancer = (projectId, data) => {
  return api.post(`/admin/projects/${projectId}/pay_freelancer`, data);
};

export const deactivateProject = (id) => {
  return api.post(`/admin/projects/${id}/deactivate`);
};

export const enableProjectAutomatedInvoicing = (projectId) => {
  return api.post(`/admin/projects/${projectId}/enable_automated_invoicing`);
};

export const disableProjectAutomatedInvoicing = (projectId) => {
  return api.post(`/admin/projects/${projectId}/disable_automated_invoicing`);
};

import api from '../api';

export const getTimesheets = (params, cancelToken) => {
  return api.get('/admin/timesheets', { params, cancelToken });
};

export const getTimesheetById = (id) => {
  return api.get(`/admin/timesheets/${id}`);
};

export const updateTimesheet = (timesheet) => {
  return api.put(`/admin/timesheets/${timesheet.id}`, timesheet);
};

export const payFreelancer = (id) => {
  return api.post(`/admin/timesheets/${id}/pay_freelancer`);
};

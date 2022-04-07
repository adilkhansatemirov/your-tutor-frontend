import api from '../api';

export const getTimesheet = (id) => {
  return api.get(`/tutor/timesheets/${id}`);
};

export const createTimesheet = (timesheet) => {
  return api.post(`/tutor/timesheets`, timesheet);
};

export const updateTimesheet = (id, timesheet) => {
  return api.put(`/tutor/timesheets/${id}`, timesheet);
};

export const deleteTimesheet = (id) => {
  return api.delete(`/tutor/timesheets/${id}`);
};

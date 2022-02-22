import api from '../api';

export const getTimesheet = (id) => {
  return api.get(`/freelancer/timesheets/${id}`);
};

export const createTimesheet = (timesheet) => {
  return api.post(`/freelancer/timesheets`, timesheet);
};

export const updateTimesheet = (id, timesheet) => {
  return api.put(`/freelancer/timesheets/${id}`, timesheet);
};

export const deleteTimesheet = (id) => {
  return api.delete(`/freelancer/timesheets/${id}`);
};

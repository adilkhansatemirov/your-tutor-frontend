import api from '../api';

export const createTimeEntry = (timeEntry) => {
  return api.post(`/freelancer/time_entries`, timeEntry);
};

export const editTimeEntry = (id, timeEntry) => {
  return api.put(`/freelancer/time_entries/${id}`, timeEntry);
};

export const deleteTimeEntry = (id) => {
  return api.delete(`/freelancer/time_entries/${id}`);
};

import api from '../api';

export const createTimeEntry = (timeEntry) => {
  return api.post(`/tutor/time_entries`, timeEntry);
};

export const editTimeEntry = (id, timeEntry) => {
  return api.put(`/tutor/time_entries/${id}`, timeEntry);
};

export const deleteTimeEntry = (id) => {
  return api.delete(`/tutor/time_entries/${id}`);
};

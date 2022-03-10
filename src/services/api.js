import axios from 'axios';
import сookies from 'js-cookie';

const resourseTemplate = '/api/v1';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL + resourseTemplate,
  headers: { 'Content-Type': 'application/json' },
});

const clearCookies = () => {
  сookies.remove('token');
};

const saveTokenInCookies = (token) => {
  сookies.set('token', token, { expires: 365 });
};

export const setSession = (token) => {
  if (token) {
    saveTokenInCookies(token);
    api.defaults.headers.Authorization = 'token ' + token;
  } else {
    clearCookies();
    if (api.defaults.headers) {
      delete api.defaults.headers['Authorization'];
    }
  }
};

export default api;

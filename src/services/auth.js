import api, { setSession } from './api';

export const signUpWithEmailAndPassword = (data) => {
  return api.post('/authentication', data);
};

export const signInWithEmailAndPassword = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post('/authentication/login', data)
      .then((response) => {
        setSession(response.data.token);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signInWithToken = (token) => {
  return api.get('/authentication/validate_token', {
    headers: {
      Authorization: 'token ' + token,
    },
  });
};

export const enterSignUpCode = (email, sign_up_code) => {
  return api.post('/authentication/enter_sign_up_code', {
    email,
    sign_up_code,
  });
};

export const logout = () => {
  setSession(null);
};

export const checkUserEmail = (data) => {
  return api.post('/authentication/check_by_email', data);
};

export const forgotPassword = (data) => {
  return api.post('/authentication/forgot_password', data);
};

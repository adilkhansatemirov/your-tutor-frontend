import * as Yup from 'yup';

export default Yup.object().shape({
  password: Yup.string().min(6, 'Password needs to be more then 6 characters').required('Password is required'),
  confirmationPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

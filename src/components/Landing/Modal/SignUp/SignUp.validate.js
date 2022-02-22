import * as Yup from 'yup';

export default Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Email address is invalid').required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password needs to be more then 6 characters')
    .required('Password is required'),
});

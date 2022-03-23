import * as Yup from 'yup';

export default Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Email address is invalid').required('Email address is required'),
  company_name: Yup.string().required('Company name is required'),
});

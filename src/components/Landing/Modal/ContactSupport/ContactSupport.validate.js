import * as Yup from 'yup';

const schema = (user) =>
  Yup.object().shape({
    email: Yup.string().when('$other', () =>
      user ? Yup.string() : Yup.string().email('Email address is invalid').required('Email address is required'),
    ),
    message: Yup.string().required('First name is required'),
    subject: Yup.string().required('Last name is required'),
  });

export default schema;

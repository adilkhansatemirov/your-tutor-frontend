import * as Yup from 'yup';

export default Yup.object().shape({
  note: Yup.string().required('Rejection note is required')
});

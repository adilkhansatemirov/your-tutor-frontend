import * as Yup from 'yup';

export default Yup.object().shape({
  customer: Yup.string(),
  task: Yup.string().required('Task is required'),
  hours: Yup.string().required('Hours is required'),
});

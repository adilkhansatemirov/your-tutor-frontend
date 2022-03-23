import * as Yup from 'yup';

export default Yup.object().shape({
  amount: Yup.number().required('Enter desired compensation'),
});

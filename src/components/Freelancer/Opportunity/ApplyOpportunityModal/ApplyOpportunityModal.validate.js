import * as Yup from 'yup';

export default Yup.object().shape({
  price: Yup.string().required('Enter desired compensation'),
});

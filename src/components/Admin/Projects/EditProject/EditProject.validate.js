import * as Yup from 'yup';

const validationSchema = (project) => {
  return Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    freelancer_detail_id: Yup.number().when('$other', () =>
      project.freelancer_detail
        ? Yup.number()
            .transform((castedValue, initialValue) => (initialValue === '' ? undefined : castedValue))
            .typeError('Select out of given options')
            .required('Freelancer is required')
        : Yup.number().nullable().notRequired(),
    ),
    client_detail_id: Yup.number()
      .transform((castedValue, initialValue) => (initialValue === '' ? undefined : castedValue))
      .typeError('Select out of given options')
      .required('Client is required'),
    invoicing_schedule: Yup.string().required('Invoicing Schedule is required'),
    client_type_of_billing: Yup.string().required('Client type of billing is required'),
    client_payment_amount: Yup.number()
      .transform((castedValue, initialValue) => (initialValue === '' ? undefined : castedValue))
      .typeError('Client payment amount must be number')
      .required('Client payment amount is required'),
    freelancer_payment_amount: Yup.number()
      .transform((castedValue, initialValue) => (initialValue === '' ? undefined : castedValue))
      .typeError('Freelancer payment amount must be number')
      .required('Freelancer payment amount is required'),
  });
};

export default validationSchema;

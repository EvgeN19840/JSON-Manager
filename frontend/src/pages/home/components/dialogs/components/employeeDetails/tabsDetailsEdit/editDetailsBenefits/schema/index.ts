import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Benefit Name is required'), 
  value: yup
    .number()
    .required('Value is required')
    .typeError('Value must be a number'),

  currencyCode: yup

    .string()
    .nullable()
    .default(null),

  companyValue: yup
    .number()
    .required('Company Value is required')
    .typeError('Company Value must be a number'),

  companyCurrencyCode: yup

    .string()
    .nullable()
    .default(null),

  isPerentValue: yup
    .boolean()
    .required('Is Percent Value is required'),

  effectiveDate: yup

    .string()
    .nullable()
    .default(null),

  id: yup
    .string()
    .required('ID is required'),
});

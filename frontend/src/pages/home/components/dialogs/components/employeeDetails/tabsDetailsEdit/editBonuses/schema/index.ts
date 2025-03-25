import * as yup from 'yup';

export const schema = yup.object().shape({
  customBambooTableRowId: yup
    .number()
    .required('Custom Bamboo Table Row ID is required'),

  effectiveDate: yup
    .string()
    .required('Effective Date is required'),

  amount: yup
    .number()
    .required('Amount is required'),

  currencyCode: yup
    .string()
    .required('Currency Code is required'),

  reason: yup
    .string()
    .nullable()
    .default(null),

  comment: yup
    .string()
    .nullable()
    .default(null),
});

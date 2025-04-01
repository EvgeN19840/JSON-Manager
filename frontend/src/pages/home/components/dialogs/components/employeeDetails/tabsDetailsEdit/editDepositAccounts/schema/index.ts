import * as yup from 'yup';

export const schema = yup.object().shape({
  orderNumber: yup
    .number()
    .nullable()
    .default(null)
    .transform((value, originalValue) =>
      originalValue === '' ? null : value
    ),

  bank: yup
    .string()
    .nullable()
    .default(null),

  accountName: yup
    .string()
    .nullable()
    .default(null),

  accountNumber: yup
    .string()
    .nullable()
    .default(null),

  currencyCode: yup
    .string()
    .nullable()
    .default(null),

  accountType: yup
    .string()
    .nullable()
    .default(null),

  transitNumber: yup
    .string()
    .nullable()
    .default(null),

  depositAmount: yup
    .number()
    .nullable()
    .default(null)
    .transform((value, originalValue) =>
      originalValue === '' ? null : value
    ),
  description: yup
    .string()
    .nullable()
    .default(null),

  customBambooTableRowId: yup
    .number()
    .required('Custom Bamboo Table Row ID is required'),

  isPercentValue: yup
    .boolean()
    .required('Is Percent Value is required'),
});

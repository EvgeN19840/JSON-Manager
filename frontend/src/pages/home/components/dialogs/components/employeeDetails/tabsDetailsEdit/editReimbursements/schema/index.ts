import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().default("").required("Name is required"),
  startDate: yup.string().nullable().default(null),
  endDate: yup.string().nullable().default(null),
  payrollOperationFrequency: yup
    .string()
    .default("")
    .required("Payroll operation frequency is required"),
  customBambooTableRowId: yup
    .number()
    .default(0)
    .required("Custom Bamboo Table Row ID is required"),
  value: yup.number().nullable().default(null),
  currencyCode: yup.string().nullable().default(null),
});

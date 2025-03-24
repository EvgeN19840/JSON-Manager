import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  startDate: yup.string().nullable().default(null),
  endDate: yup.string().nullable().default(null),
  payrollOperationFrequency: yup
    .string()
    .required("Payroll Operation Frequency is required"),
  customBambooTableRowId: yup
    .number()
    .required("Custom Bamboo Table Row ID is required"),
  value: yup
    .number()
    .typeError("Value must be a number")
    .required("Value is required"),
  currencyCode: yup
    .string()
    .required("Currency Code is required"),
  isActive: yup
    .boolean()
    .required("Active status is required"),
  comment: yup
    .string()
    .nullable()
    .default(null),
  componentType: yup
    .number()
    .typeError("Component Type must be a number")
    .required("Component Type is required")
});

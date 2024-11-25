import * as yup from "yup";
export const employmentStatusSchema = yup.object().shape({
  customBambooTalbeRowId: yup.number().required("Row ID is required"),
  effectiveDate: yup.string().nullable().default(null),
  employmentStatus: yup
    .string()
    .nullable()
    .default(null),
  comment: yup
    .string()
    .nullable()
    .default(null),
});

export const salarySchema = yup.object().shape({
  customBambooTalbeRowId: yup.number().required("Row ID is required"),
  salaryRate: yup.number().nullable().default(null),
  salaryCurrencyCode: yup.string().nullable().default(null),
  salaryRatePeriod: yup.string().nullable().default(null),
  payPeriod: yup.string().nullable().default(null),
  allowOvertime: yup.boolean().required().default(false),
  effectiveDate: yup.string().nullable().default(null),
  changeReason: yup.string().nullable().default(null),
  comment: yup.string().nullable().default(null),
  overtimeRate: yup.number().nullable().default(null),
});

export const jobInfoSchema = yup.object().shape({
  customBambooTalbeRowId: yup.number().required("Row ID is required"),
  effectiveDate: yup.string().nullable().default(null),
  jobTitle: yup.string().nullable().default(null),
  department: yup.string().nullable().default(null),
  location: yup.string().nullable().default(null),
  division: yup.string().nullable().default(null),
  reportsTo: yup.string().nullable().default(null),
});


import * as yup from "yup";

export const schema = yup.object().shape({
  eId: yup.number().default(0), 
  number: yup.mixed<string | number>().nullable().default(0),
  firstName: yup.string().default(""),
  middleName: yup.string().nullable().default(""),
  lastName: yup.string().default(""),
  birthDate: yup.string().nullable().default(""),
  email: yup.string().nullable().default("").email("Invalid email"),
  addressStreet1: yup.string().nullable().default(""),
  addressStreet2: yup.string().nullable().default(""),
  addressCity: yup.string().nullable().default(""),
  addressState: yup.string().nullable().default(""),
  addressZip: yup.string().nullable().default(""),
  addressCountry: yup.string().nullable().default(""),
  hireDate: yup.string().nullable().default(""),
  endDate: yup.string().nullable().default(""),
  enabledForCayPay: yup.boolean().default(false),
  pensionMemberNumber: yup.string().nullable().default(""),
  healthInsuranceMemberNumber: yup.string().nullable().default(""),
  lifeInsuranceMemberNumber: yup.string().nullable().default(""),
  transferEmployeeStatutoryToVoluntaryOnCap: yup.boolean().default(false),
  transferCompanyStatutoryToVoluntaryOnCap: yup.boolean().default(false),
});

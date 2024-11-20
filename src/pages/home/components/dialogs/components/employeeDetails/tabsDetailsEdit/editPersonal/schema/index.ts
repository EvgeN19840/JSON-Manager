import * as yup from "yup";

export const schema = yup.object().shape({
  eId: yup.number().default(0), 
  number: yup.string().default(""), 
  firstName: yup.string().default(""),
  middleName: yup.string().default(""),
  lastName: yup.string().default(""),
  birthDate: yup.string().default(""),
  email: yup.string().default("").email("Invalid email"),
  addressStreet1: yup.string().default(""),
  addressStreet2: yup.string().default(""),
  addressCity: yup.string().default(""),
  addressState: yup.string().default(""),
  addressZip: yup.string().default(""),
  addressCountry: yup.string().default(""),
  hireDate: yup.string().default(""),
  endDate: yup.string().default(""),
  enabledForCayPay: yup.boolean().default(false),
  pensionMemberNumber: yup.string().default(""),
  healthInsuranceMemberNumber: yup.string().default(""),
  lifeInsuranceMemberNumber: yup.string().default(""),
  transferEmployeeStatutoryToVoluntaryOnCap: yup.boolean().default(false),
  transferCompanyStatutoryToVoluntaryOnCap: yup.boolean().default(false),
});

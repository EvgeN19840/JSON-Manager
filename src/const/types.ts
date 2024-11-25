export interface ITypeJSON {
  employees: IEmployee[];
  benefits: ISystemBenefit[];
}


export interface IEmployeeBasicInfo {
  eId: number;
  number: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  email: string;
  addressStreet1: string;
  addressStreet2: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  hireDate: string;
  endDate: string;
  enabledForCayPay: boolean;
  pensionMemberNumber: string;
  healthInsuranceMemberNumber: string;
  lifeInsuranceMemberNumber: string;
  transferEmployeeStatutoryToVoluntaryOnCap: boolean;
  transferCompanyStatutoryToVoluntaryOnCap: boolean;
}




export interface IEmployee {
  eId: number;
  number: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  email: string;
  addressStreet1: string;
  addressStreet2: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  hireDate: string;
  endDate: string;
  enabledForCayPay: boolean;
  pensionMemberNumber: string;
  healthInsuranceMemberNumber: string;
  lifeInsuranceMemberNumber: string;
  transferEmployeeStatutoryToVoluntaryOnCap: boolean;
  transferCompanyStatutoryToVoluntaryOnCap: boolean;
  depositAccounts: IDepositAccounts[];
  reimbursements: IReimbursement[];
  loansAndSalaryAdvances: ILoanOrSalaryAdvance[];
  otherDeductions: IOtherDeduction[];
  benefits: IEmployeeBenefit[];
  salary: ISalary[];
  jobInfo: IJobInfo[];
  employmentStatus: IEmploymentStatus[];
  bonuses: IBonuses[];
}

export interface IDepositAccounts {
  orderNumber: number;
  bank: string;
  accountName: string;
  accountNumber: string;
  currencyCode: string;
  accountType: string;
  transitNumber: string;
  depositAmount: number | null;
  description: string | null;
  customBambooTalbeRowId: number;
  isPercentValue: boolean;
}

export interface IReimbursement {
  name: string;
  startDate: string | null;
  endDate: string | null;
  payrollOperationFrequency: string;
  customBambooTableRowId: number;
  value: number;
  currencyCode: string;
}

export interface ILoanOrSalaryAdvance {
  name: string;
  startDate: string | null;
  endDate: string | null;
  payrollOperationFrequency: string;
  customBambooTableRowId: number;
  value: number;
  currencyCode: string;
}

export interface IOtherDeduction {
  name: string;
  startDate: string | null;
  endDate: string | null;
  payrollOperationFrequency: string;
  customBambooTableRowId: number;
  value: number;
  currencyCode: string;
}

export interface IEmployeeBenefit {
  name: string;
  value: number;
  currencyCode: string;
  companyValue: number;
  companyCurrencyCode: string;
  isPerentValue: boolean;
  effectiveDate: string;
  id: string;
}

export interface ISalary {
  customBambooTalbeRowId: number;
  salaryRate: number| null;
  salaryCurrencyCode:string | null;
  salaryRatePeriod: string | null;
  payPeriod: string | null;
  allowOvertime: boolean;
  effectiveDate:string | null;
  changeReason: string | null;
  comment: string | null;
  overtimeRate: number | null;
}

export interface IJobInfo {
  customBambooTalbeRowId: number;
  effectiveDate: string| null;
  jobTitle: string| null;
  department: string | null;
  location: string | null;
  division: string | null;
  reportsTo: string | null;
}


export interface IEmploymentStatus {
  customBambooTalbeRowId: number;
  effectiveDate:string | null;
  employmentStatus:string | null;
  comment: string | null;
}

export interface IBonuses {
  customBambooTalbeRowId: number;
  effectiveDate: string;
  amount: number;
  currencyCode: string;
  reason: string | null;
  comment: string | null;
}

export interface ISystemBenefit {
  name: string;
  id: string;
}

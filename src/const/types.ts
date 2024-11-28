export interface ITypeJSON {
  employees: IEmployee[];
  benefits: ISystemBenefit[];
}


export interface IEmployeeBasicInfo {
  eId: number;
  number: string ;
  firstName: string ;
  middleName: string | null ;
  lastName: string ;
  birthDate: string |null;
  email: string |null;
  addressStreet1: string |null;
  addressStreet2: string |null;
  addressCity: string |null;
  addressState: string |null;
  addressZip: string |null;
  addressCountry: string |null;
  hireDate: string |null;
  endDate: string |null;
  enabledForCayPay: boolean;
  pensionMemberNumber:string |null;
  healthInsuranceMemberNumber:string |null;
  lifeInsuranceMemberNumber:string |null;
  transferEmployeeStatutoryToVoluntaryOnCap: boolean;
  transferCompanyStatutoryToVoluntaryOnCap: boolean;
}




export interface IEmployee {
  eId: number;
  number: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  birthDate: string |null;
  email: string |null;
  addressStreet1: string |null;
  addressStreet2: string |null;
  addressCity: string |null;
  addressState: string |null;
  addressZip: string |null;
  addressCountry: string |null;
  hireDate: string |null;
  endDate: string |null;
  enabledForCayPay: boolean;
  pensionMemberNumber:string |null;
  healthInsuranceMemberNumber:string |null;
  lifeInsuranceMemberNumber:string |null;
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
  orderNumber: number | null;
  bank: string | null;
  accountName: string | null;
  accountNumber: string | null;
  currencyCode: string | null;
  accountType: string | null;
  transitNumber: string | null;
  depositAmount: number | null;
  description: string | null;
  customBambooTableRowId: number;
  isPercentValue: boolean;
}

export interface IReimbursement {
  name: string;
  startDate: string | null;
  endDate: string | null;
  payrollOperationFrequency: string;
  customBambooTableRowId: number;
  value: number | null;
  currencyCode: string | null;
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
  customBambooTableRowId: number;
  name: string;
  startDate: string | null;
  endDate: string | null;
  payrollOperationFrequency: string;
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
  customBambooTableRowId: number;
  salaryRate: number | null;
  salaryCurrencyCode: string | null;
  salaryRatePeriod: string | null;
  payPeriod: string | null;
  allowOvertime: boolean;
  effectiveDate: string | null;
  changeReason: string | null;
  comment: string | null;
  overtimeRate: number | null;
}

export interface IJobInfo {
  customBambooTableRowId: number;
  effectiveDate: string | null;
  jobTitle: string | null;
  department: string | null;
  location: string | null;
  division: string | null;
  reportsTo: string | null;
}


export interface IEmploymentStatus {
  customBambooTableRowId: number;
  effectiveDate: string | null;
  employmentStatus: string | null;
  comment: string | null;
}

export interface IBonuses {
  customBambooTableRowId: number;
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

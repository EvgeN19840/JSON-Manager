export interface ITypeJSON {
  employees: IEmployee[];
  benefits: ISystemBenefit[];
}

export interface IEmployee {
  eId: number;
  number: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  birthDate: string | null;
  email: string | null;
  hireDate: string;
  endDate: string | null;
  enabledForCayPay: boolean;
  pensionMemberNumber: string;
  healthInsuranceMemberNumber: string;
  lifeInsuranceMemberNumber: string;
  transferEmployeeStatutoryToVoluntaryOnCap: boolean;
  transferCompanyStatutoryToVoluntaryOnCap: boolean;
  depositAccounts: IDepositAccount[];
  reimbursements: IReimbursement[];
  loansAndSalaryAdvances: ILoanOrSalaryAdvance[];
  otherDeductions: IOtherDeduction[];
  benefits: IEmployeeBenefit[];
  salary: ISalary[];
  jobInfo: IJobInfo[];
  employmentStatus: IEmploymentStatus[];
  bonuses: IBonus[];
}

export interface IDepositAccount {
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
  effectiveDate: string | null;
  id: string;
}

export interface ISalary {
  customBambooTalbeRowId: number;
  salaryRate: number;
  salaryCurrencyCode: string;
  salaryRatePeriod: string;
  payPeriod: string | null;
  allowOvertime: boolean;
  effectiveDate: string;
  changeReason: string | null;
  comment: string | null;
  overtimeRate: number | null;
}

export interface IJobInfo {
  customBambooTalbeRowId: number;
  effectiveDate: string;
  jobTitle: string;
  department: string | null;
  location: string | null;
  division: string | null;
  reportsTo: string | null;
}

export interface IEmploymentStatus {
  customBambooTalbeRowId: number;
  effectiveDate: string;
  employmentStatus: string;
  comment: string | null;
}

export interface IBonus {
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

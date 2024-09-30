  
  export interface Employee {
    eId: number;
    id:number;
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
    depositAccounts: DepositAccount[];
    reimbursements: Reimbursement[];
    loansAndSalaryAdvances: LoanOrSalaryAdvance[];
    otherDeductions: OtherDeduction[];
    benefits: Benefit[];
    salary: Salary[];
    jobInfo: JobInfo[];
    employmentStatus: EmploymentStatus[];
    bonuses: Bonus[];
  }
  
  export interface DepositAccount {
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
  
  export interface Reimbursement {
    name: string;
    startDate: string | null;
    endDate: string | null;
    payrollOperationFrequency: string;
    customBambooTableRowId: number;
    value: number;
    currencyCode: string;
  }
  
  export interface LoanOrSalaryAdvance {
    name: string;
    startDate: string | null;
    endDate: string | null;
    payrollOperationFrequency: string;
    customBambooTableRowId: number;
    value: number;
    currencyCode: string;
  }
  
  export interface OtherDeduction {
    name: string;
    startDate: string | null;
    endDate: string | null;
    payrollOperationFrequency: string;
    customBambooTableRowId: number;
    value: number;
    currencyCode: string;
  }
  
  export interface Benefit {
    name: string;
    value: number;
    currencyCode: string;
    companyValue: number;
    companyCurrencyCode: string;
    isPerentValue: boolean;
    effectiveDate: string | null;
    id: string;
  }
  
  export interface Salary {
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
  
  export interface JobInfo {
    customBambooTalbeRowId: number;
    effectiveDate: string;
    jobTitle: string;
    department: string | null;
    location: string | null;
    division: string | null;
    reportsTo: string | null;
  }
  
  export interface EmploymentStatus {
    customBambooTalbeRowId: number;
    effectiveDate: string;
    employmentStatus: string;
    comment: string | null;
  }
  
  export interface Bonus {
    customBambooTalbeRowId: number;
    effectiveDate: string;
    amount: number;
    currencyCode: string;
    reason: string | null;
    comment: string | null;
  }
  
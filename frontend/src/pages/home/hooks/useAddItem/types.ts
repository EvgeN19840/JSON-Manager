// ** Types
import {
    IBonuses,
    IDepositAccounts,
    IEmployee,
    IEmployeeBenefit,
    IEmploymentStatus,
    IJobInfo,
    IOtherDeduction,
    IReimbursement,
    ISalary,
    ISystemBenefit,
} from "@/types/json";
export interface IUseHandleAddItemParams {
    item:
    | IEmployee
    | ISystemBenefit
    | ISalary
    | IJobInfo
    | IDepositAccounts
    | IEmploymentStatus
    | IEmployeeBenefit
    | IBonuses
    | IOtherDeduction
    | IReimbursement;
    type: "employees" | "benefits" | "item";
    eId?: string | number;
    nestedType?:
    | "salary"
    | "employmentStatus"
    | "jobInfo"
    | "depositAccounts"
    | "benefits"
    | "bonuses"
    | "reimbursements"
    | "otherDeductions"
    |"loansAndSalaryAdvances"
}
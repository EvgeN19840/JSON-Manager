// ** Types
import { IBonuses, IDepositAccounts, IEmployee, IEmployeeBenefit, IEmploymentStatus, IFees, IJobInfo, IOtherDeduction, IReimbursement, ISalary, ISystemBenefit } from "@/types/json";

export type IModalType = "Export data" | "Import data" | "Edit user" | "Edit benefits" | "Details" | "Edit Details" | "Duplicate" | null
export type IModalTypeDetailsEdits = 'Edit loanOrAdvance' | 'Edit health benefits details' | 'Edit life benefits details' | 'Edit pension benefits details' | "Edit salary" | "Edit status" | "Edit job" | "Edit deposit accounts" | "Edit reimbursements" | "Edit Personal" | "Edit deductions" | "Edit bonuses" | 'Edit fees' | null
export interface IModalTypeContext {
  typeModal: IModalType
  typeModalDetailsEdit: IModalTypeDetailsEdits;
  setTypeModal: (data: IModalType) => void;
  setTypeModalDetailsEdit: (data: IModalTypeDetailsEdits) => void,
  dataForDialog: IDataForDialog | null;
  isDialogOpen: boolean;
  setDataForDialog: (data: IDataForDialog) => void,
  setDialogOpen: (data: boolean) => void;
  closeDialog: () => void;
  handleClickOpenDialog: (actionType: IModalType, item?: IDepositAccounts | IDataForDialog | IEmployee | IBonuses | ISystemBenefit | IJobInfo | IEmploymentStatus | ISalary | IReimbursement | IFees) => void;
}
export interface IEmployeeDataForDialog extends IEmployee {
  eId: number;
}
export type IDataForDialog =
  | IEmployee
  | ISystemBenefit[]
  | ISalary[]
  | IJobInfo[]
  | IDepositAccounts[]
  | IEmploymentStatus[]
  | IEmployeeBenefit[]
  | IBonuses[]
  | IOtherDeduction[]
  | string


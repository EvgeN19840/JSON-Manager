// ** Types
import { IBonuses, IDepositAccounts, IEmployee, IEmployeeBenefit, IJobInfo, IOtherDeduction, ISystemBenefit } from "@/const/types";

export type IModalType = "Export data" | "Import data" | "Edit user" | "Edit benefits" | "Details" | "Details benefit data" | null
export type IModalTypeDetails = "Personal" | "Benefits" | "Job" | "Deposit Accounts" | "Custom income" | "Custom deductions" | "Bonus" | null
export interface IModalTypeContext {
  typeModal: IModalType
  typeModalDetails: IModalTypeDetails;
  setTypeModal: (data: IModalType) => void;
  setTypeModalDetails: (data: IModalTypeDetails) => void;
  dataForDialog:  IDataForDialog |null | string;
  isDialogOpen: boolean;
  setDialogOpen: (data: boolean) => void;
  closeDialog: () => void;
  handleClickOpenDialog: (actionType: IModalType, item?:  IDataForDialog | IEmployee | ISystemBenefit) => void;
}
export type IDataForDialog = IEmployee[] | ISystemBenefit[] | IJobInfo[] | IDepositAccounts[] | IOtherDeduction[] | IBonuses[] |IEmployeeBenefit[];

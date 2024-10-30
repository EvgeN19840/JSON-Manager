// ** Types
import { IDepositAccount, IEmployee, IJobInfo, ISystemBenefit } from "@/const/types";

export type IModalType = "Export data" | "Import data" | "Edit user" | "Edit benefits" | "Details" | "Details benefit data" | null
export type IModalTypeDetails = "Personal" | "Benefits" | "Job" | "Deposit Accounts" | "Custom income" | "Custom deductions" | "Bonus" | null
export interface IModalTypeContext {
  typeModal: IModalType
  typeModalDetails: IModalTypeDetails;
  setTypeModal: (data: IModalType) => void;
  setTypeModalDetails: (data: IModalTypeDetails) => void;
  dataForDialog: IDataForDialog,
  isDialogOpen: boolean;
  setDialogOpen: (data: boolean) => void;
  closeDialog: () => void;
  handleClickOpenDialog: (actionType: IModalType, item?: IEmployee | ISystemBenefit) => void;
}

export type IDataForDialog = string | null | IEmployee | ISystemBenefit | IJobInfo | IDepositAccount

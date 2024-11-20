// ** Types
import { IBonuses, IDepositAccounts, IEmployee, IEmployeeBenefit, IJobInfo, IOtherDeduction, ISystemBenefit } from "@/const/types";

export type IModalType = "Export data" | "Import data" | "Edit user" | "Edit benefits" | "Details" | "Edit Details" |null
export type IModalTypeDetailsEdits = "Edit benefits details" | "Edit job" | "Edit deposit accounts" | "Edit custom income" | "Edit Personal"| "Edit custom deductions" | "Edit Bonus" | null
export interface IModalTypeContext {
  typeModal: IModalType
  typeModalDetailsEdit: IModalTypeDetailsEdits;
  setTypeModal: (data: IModalType) => void;
  setTypeModalDetailsEdit: (data: IModalTypeDetailsEdits) => void,
  dataForDialog: IDataForDialog | null | string;
  isDialogOpen: boolean;
  setDialogOpen: (data: boolean) => void;
  closeDialog: () => void;
  handleClickOpenDialog: (actionType: IModalType, item?: IDataForDialog | IEmployee | ISystemBenefit) => void;
}
export type IDataForDialog = IEmployee[] | ISystemBenefit[] | IJobInfo[] | IDepositAccounts[] | IOtherDeduction[] | IBonuses[] | IEmployeeBenefit[] |IEmployeeBenefit;

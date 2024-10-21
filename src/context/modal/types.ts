import { IEmployee, ISystemBenefit } from "@/const/types";

export type IModalType = "Export data" | "Import data" | "Edit user" | "Edit benefits" | null

export interface IModalTypeContext {
  typeModal: IModalType
  setTypeModal: (data: IModalType) => void;
  dataForDialog: IDataForDialog,
  isDialogOpen: boolean;
  setDialogOpen: (data: boolean) => void;
  closeDialog: () => void;
  handleClickOpenDialog: (actionType: IModalType, item?: IEmployee | ISystemBenefit) => void;
}

export type IDataForDialog = string | null | IEmployee | ISystemBenefit

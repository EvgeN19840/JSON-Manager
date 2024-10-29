// ** Types
import { IEmployee, ISystemBenefit, } from "@/const/types";





export type contextMenuItemsCallbacks = {
  openForm: (data: IEmployee | ISystemBenefit) => void;
  deleteItem: (data: IEmployee | ISystemBenefit) => void;
  addItem: (data: IEmployee | ISystemBenefit) => void;
};
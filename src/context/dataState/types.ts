// ** Types
import { IEmployee, ISystemBenefit, ITypeJSON, } from "@/const/types";

export interface DataContextType {
  data: ITypeJSON;
  setData: (data: ITypeJSON) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;
  handleDeleteItem: (
    id: number | string,
    type: "employees" | "benefits" | "item",
    eId?: number | string
  ) => void;
  handleAddItem: (
    item: IEmployee | ISystemBenefit,
    type: "employees" | "benefits" | "item",
    eId?: number | string
  ) => void;
  handleSaveEmployee: (data: IEmployee) => void;
  handleSaveBenefit: (data: ISystemBenefit) => void;
  handleSaveData: <T extends { id: string | number }>(
    value: T,
    type: "employeeBenefit" | "depositAccount" | "bonuses"
  ) => void;
  hasData: boolean;
}

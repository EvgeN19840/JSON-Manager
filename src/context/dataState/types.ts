// ** Types
import { IEmployee, ISystemBenefit, ITypeJSON, } from "@/const/types";

export interface DataContextType {
  data: ITypeJSON;
  setData: (data: ITypeJSON) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;
  handleDeleteItem: (id: number | string, type: "employees" | "benefits") => void;
  handleAddItem:(item: IEmployee | ISystemBenefit, type: "employees" | "benefits") => void,
  handleSaveEmployee: (data: IEmployee) => void;
  handleSaveBenefit: (data: ISystemBenefit) => void;
  hasData: boolean;
}

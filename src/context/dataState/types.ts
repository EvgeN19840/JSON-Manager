// ** Types
import { IEmployee, ISystemBenefit, ITypeJSON, } from "@/const/types";

export interface DataContextType {
  data: ITypeJSON;
  setData: (data: ITypeJSON) => void;
  eIdSetectedEmploee: number | null;
  setEIdSetectedEmploee: (eId: number) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;
  handleDeleteItem: (
    id: number | string,
    type: "employees" | "benefits" | "item",
    eId?: number | string,
    nestedType?: "salary" | "employmentStatus" | "jobInfo" | "depositAccounts" | "benefits"
  ) => void;
  handleAddItem: (
    item: IEmployee | ISystemBenefit,
    type: "employees" | "benefits" | "item",
    eId?: number | string
  ) => void;
  handleSaveEmployee: (data: IEmployee) => void;
  handleSaveBenefit: (data: ISystemBenefit) => void;
  handleSaveData: <
    T extends Partial<{ id: string | number; eId: number; customBambooTalbeRowId: number }>
  >(
    value: T,
    type: "employeeBenefit" | "depositAccount" | "bonuses" | "personal"
  ) => void;
  hasData: boolean;
}

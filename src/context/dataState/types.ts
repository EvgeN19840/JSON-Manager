// ** Types
import { IEmployee, ISystemBenefit, ITypeJSON, } from "@/const/types";

export interface DataContextType {
  countDuplicates: string;
  setCountDuplicates: (count: string) => void;
  data: ITypeJSON;
  setData: (data: ITypeJSON) => void;
  eIdSelectedEmployee: number | null;
  seteIdSelectedEmployee: (eId: number) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;
  handleSaveEmployee: (data: IEmployee) => void;
  handleSaveBenefit: (data: ISystemBenefit) => void;
  handleSaveData: <
    T extends Partial<{ id: string | number; eId: number; customBambooTableRowId: number; }>
  >(
    value: T,
    type: "employeeBenefit" | "depositAccount" | "bonuses" | "personal" | "jobInfo" | "salary" | "status" | "otherDeductions" | "reimbursements"
  ) => void;
  hasData: boolean;
}

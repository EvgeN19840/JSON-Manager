// ** Types
import { ISystemBenefit, ITypeJSON, } from "@/types/json";

export interface DataContextType {
  countDuplicates: string;
  setCountDuplicates: (count: string) => void;
  data: ITypeJSON;
  setData: React.Dispatch<React.SetStateAction<ITypeJSON>>;
  eIdSelectedEmployee: number | null;
  seteIdSelectedEmployee: (eId: number) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;

  handleSaveBenefit: (data: ISystemBenefit) => void;
  handleSaveData: <
    T extends Partial<{ id: string | number; eId: number; customBambooTableRowId: number; }>
  >(
    value: T,
    type: "employeeBenefit" | "depositAccounts" | "bonuses" | "personal" | "jobInfo" | "salary" | "employmentStatus" | "otherDeductions" | "reimbursements"
  ) => void;
  hasData: boolean;
}

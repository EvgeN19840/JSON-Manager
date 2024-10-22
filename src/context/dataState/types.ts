import { IEmployee, ISystemBenefit, ITypeJSON, } from "@/const/types";

export interface DataContextType {
  data: ITypeJSON;
  setData: (data: ITypeJSON) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;

  handleSaveEmployee: (data: IEmployee) => void;
  handleSaveBenefit: (data: ISystemBenefit) => void;
  hasData: boolean;
}

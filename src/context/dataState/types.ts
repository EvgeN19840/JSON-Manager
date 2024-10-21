import { IEmployee, ITypeJSON, } from "@/const/types";

export interface DataContextType {
  data: ITypeJSON;
  setData: (data: ITypeJSON) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;

  handleSaveEmployee: (data: IEmployee) => void;
  handleSaveBenefit: (benefitName: string, benefitID: string) => void;
  hasData: boolean;
}

import { Employee, ITypeJSON } from "@/const/types";

export interface DataContextType {
  data: ITypeJSON | null;
  setData: (data: ITypeJSON) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;
  handleSave: (updatedEmployee: Employee) => void;
  hasData: boolean
}

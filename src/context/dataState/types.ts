import { Employee, ITypeJSON } from "@/const/types";

export interface DataContextType {
  data: ITypeJSON | null;
  setData: (data: ITypeJSON) => void; 
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;
  handleSave: (updatedEmployee: Employee) => void; 
}

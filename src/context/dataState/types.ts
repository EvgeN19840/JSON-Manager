import { Employee, ITypeJSON, SystemBenefit } from "@/const/types";

export interface DataContextType {
  data: ITypeJSON | null;
  setData: (data: ITypeJSON) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;
  handleSaveEmployee: (updatedEmployee: Employee) => void;
  handleSaveBenefit: (updatedBenefit: SystemBenefit) => void;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
  selectedBenefit: SystemBenefit | null;
  setSelectedBenefit: (benefit: SystemBenefit | null) => void;

  hasData: boolean;
}

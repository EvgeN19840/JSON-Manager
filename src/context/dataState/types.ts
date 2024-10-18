import { Employee, ITypeJSON, SystemBenefit } from "@/const/types";

export interface DataContextType {
  data: ITypeJSON | null;
  setData: (data: ITypeJSON) => void;
  parsedData: string | null;
  setParsedData: (parsedData: string | null) => void;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
  selectedBenefit: SystemBenefit | null;
  setSelectedBenefit: (benefit: SystemBenefit | null) => void;
  handleSaveEmployee: (firstName: string, lastName: string) => void;
  handleSaveBenefit: (benefitName: string, benefitID: string) => void;
  hasData: boolean;
}

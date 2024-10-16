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
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
    benefitName: string;
  setBenefitName: (name: string) => void;
  benefitID: string;
  setBenefitID: (id: string) => void;
  handleSaveEmployee: () => void;
  handleSaveBenefit: () => void;
  hasData: boolean;
}

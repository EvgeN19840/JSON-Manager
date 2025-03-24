import { employeeData } from "@/constants/jsonBase/index";
import { getAllLocalStorage } from "@/services/storageService";
import { ITypeJSON, IEmployee } from "@/types/json";

export const listTemplate = (): ITypeJSON => {
  let localStorageEmployees: IEmployee[] = [];

  if (typeof window !== "undefined") {
    localStorageEmployees = getAllLocalStorage();
  }

  const mergedEmployees: IEmployee[] = [...localStorageEmployees, ...employeeData.employees];

  return {
    employees: mergedEmployees,
    benefits: employeeData.benefits,
  };
};

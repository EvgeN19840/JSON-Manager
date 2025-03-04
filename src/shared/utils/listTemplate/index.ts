import { employeeData } from "@/const/jsonBase/index";
import { getAllLocalStorage } from "@/services/storageService";
import { ITypeJSON, IEmployee } from "@/const/types";

export const listTemplate = (): ITypeJSON => {
    const localStorageEmployees: IEmployee[] = getAllLocalStorage();
    const mergedEmployees: IEmployee[] = [...localStorageEmployees, ...employeeData.employees];

    return {
        employees: mergedEmployees,
        benefits: employeeData.benefits
    };
};

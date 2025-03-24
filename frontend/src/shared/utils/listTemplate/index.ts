import { employeeData } from "@/constants/jsonBase/index";
import { getAllLocalStorage } from "@/services/storageService";
import { ITypeJSON, IEmployee } from "@/types/json";

export const listTemplate = (): ITypeJSON => {
    const localStorageEmployees: IEmployee[] = getAllLocalStorage();
    console.log(" localStorageEmployees", localStorageEmployees);
    const mergedEmployees: IEmployee[] = [...localStorageEmployees, ...employeeData.employees];

    return {
        employees: mergedEmployees,
        benefits: employeeData.benefits
    };
};

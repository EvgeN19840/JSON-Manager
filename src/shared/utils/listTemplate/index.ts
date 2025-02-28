import { employeeData } from "@/const/jsonBase/index";
import { getAllLocalStorage } from "@/services/storageService";

export const listTemplate = () => {
    const localStorageEmployees = getAllLocalStorage();
    const mergedEmployees = [...localStorageEmployees, ...employeeData.employees];

    return { employees: mergedEmployees, benefits: employeeData.benefits };
};

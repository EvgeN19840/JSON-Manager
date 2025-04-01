// ** Constants
import { employeeData } from '@/constants/jsonBase'

// ** Utils
import { getAllLocalStorage } from '@/services/storageService'

// ** Types
import { IEmployee, ITypeJSON } from '@/types/json'


export const listTemplate = (): ITypeJSON => {
    const localStorageEmployees: IEmployee[] = getAllLocalStorage();
    const mergedEmployees: IEmployee[] = [...localStorageEmployees, ...employeeData.employees];

    return {
        employees: mergedEmployees,
        benefits: employeeData.benefits
    };
};

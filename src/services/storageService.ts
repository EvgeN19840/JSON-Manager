import { IEmployee } from "@/const/types";

export function saveEmployeeToLocalStorage(employee: IEmployee) {
    localStorage.setItem(employee.firstName, JSON.stringify(employee));
}

export function getAllLocalStorage(): IEmployee[] {
    const employees: IEmployee[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            const storedData = localStorage.getItem(key);
            if (storedData) {
                const parsedData: IEmployee = JSON.parse(storedData);
                if (parsedData && parsedData.eId && parsedData.firstName) {
                    employees.push(parsedData);
                }
            }
        }
    }
    return employees;
}

export function removeEmployeesFromLocalStorage(firstName: string) {
    localStorage.removeItem(firstName);
}

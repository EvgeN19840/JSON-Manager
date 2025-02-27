import { IEmployee } from "@/const/types";

export function saveEmployeeToLocalStorage(employee: IEmployee) {
    localStorage.setItem(employee.firstName, JSON.stringify(employee));
}

export function getEmployeesFromLocalStorage(firstName: string): IEmployee[] {
    const data = localStorage.getItem(firstName);
    return data ? JSON.parse(data) : [];
}

export function removeEmployeesFromLocalStorage(firstName: string) {
    localStorage.removeItem(firstName);
}

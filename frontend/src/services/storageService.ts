// ** Types
import { IEmployee } from "@/types/json";
import { NotificationMessage } from "./types";



export function saveEmployeeToLocalStorage(employee: IEmployee): NotificationMessage {
    if (employee.firstName === "John") {
        return { text: "This name is not allowed. Please choose a different one.", type: "error" };
    }
    const allTemplatesLS = getAllLocalStorage();
    const existingEmployeeIndex = allTemplatesLS.findIndex(emp => emp.firstName === employee.firstName);

    if (existingEmployeeIndex !== -1) {
        const updatedEmployee = { ...allTemplatesLS[existingEmployeeIndex], ...employee };
        localStorage.setItem(updatedEmployee.eId.toString(), JSON.stringify(updatedEmployee));
        return { text: `Employee ${employee.firstName} updated successfully.`, type: "success" };
    }

    const allIds = allTemplatesLS.map(emp => emp.eId);
    const newId = allIds.length > 0 ? Math.max(...allIds) + 1 : 2;
    const newEmployee = { ...employee, eId: newId };

    localStorage.setItem(newId.toString(), JSON.stringify(newEmployee));

    return { text: "Employee saved successfully.", type: "success" };
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

export function removeEmployeesFromLocalStorage(eId: number): NotificationMessage {
    if (!localStorage.getItem(eId.toString())) {
        return { text: `Employee with eId ${eId} was not found in localStorage.`, type: "error" };
    }

    localStorage.removeItem(eId.toString());
    return { text: "Employee removed successfully.", type: "success" };
}

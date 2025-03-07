import { IEmployee } from "@/const/types";
import { INotificationType } from "@/context/snackBar/types";

interface NotificationMessage {
    text: string;
    type: INotificationType;
}

export function saveEmployeeToLocalStorage(employee: IEmployee): NotificationMessage {
    if (employee.firstName === "John") {
        return { text: "This name is not allowed. Please choose a different one.", type: "error" };
    }
    const allTemplatesLS = getAllLocalStorage();
    const allIds: number[] = [];
    for (const template of allTemplatesLS) {
        allIds.push(template.eId);

    }
    const newId = allIds.length > 0 ? Math.max(...allIds) + 1 : 2;
    const updatedEmployee = { ...employee, eId: newId };

    localStorage.setItem(employee.firstName, JSON.stringify(updatedEmployee));

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

export function removeEmployeesFromLocalStorage(firstName: string): NotificationMessage {
    if (firstName === "John") {
        return { text: "This employee cannot be removed.", type: "error" };
    }
    if (!localStorage.getItem(firstName)) {
        return { text: `${firstName} was not found in localStorage.`, type: "error" };
    }

    localStorage.removeItem(firstName);
    return { text: "Employee removed successfully.", type: "success" };
}

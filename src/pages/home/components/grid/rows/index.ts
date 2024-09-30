
import { employeeData } from "../../../const/index";
import { IRows } from "../types";
export const rows: IRows[] = employeeData.employees.map((employees) => ({
    id: employees.eId,
    firstName: employees.firstName,
    lastName: employees.lastName,
  }));
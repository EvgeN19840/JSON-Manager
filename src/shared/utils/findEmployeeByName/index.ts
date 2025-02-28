import { listTemplate } from "@/shared/utils/listTemplate";
import { IEmployee } from "@/const/types";

export const findEmployeeByName = (selectedName: string): IEmployee => {
  const employees: IEmployee[] = listTemplate().employees;

  const foundEmployee = employees.find((emp) => emp.firstName === selectedName);

  if (!foundEmployee) {
    throw new Error(`Employee with name "${selectedName}" not found`);
  }

  return foundEmployee;
};

import { listTemplate } from "@/shared/utils/listTemplate";
import { IEmployee } from "@/types/json";

export const findEmployeeByName = (selectedName: string): IEmployee | null => {
  const { employees } = listTemplate();
  return employees.find((emp) => emp.firstName === selectedName) || null;
};

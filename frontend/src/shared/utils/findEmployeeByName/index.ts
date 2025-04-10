// ** Utils
import { listTemplate } from '@/shared/utils/listTemplate'

// ** Types
import { IEmployee } from '@/types/json'


export const findEmployeeByName = (selectedName: string): IEmployee | null => {
  const { employees } = listTemplate();
  return employees.find((emp) => emp.firstName === selectedName) || null;
};

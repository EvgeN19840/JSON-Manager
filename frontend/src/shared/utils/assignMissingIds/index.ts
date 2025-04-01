// ** Types
import { ITypeJSON, IEmployee } from "@/types/json";

export const assignMissingIds = (
  parsedData: ITypeJSON,
  type: "employees" | "benefits",
  eId?: string | number,
  nestedType?: keyof IEmployee,
  idKey: "id" | "customBambooTableRowId" = "id"
): number => {
  let maxId = 0;

  if (eId && nestedType) {
    const employee = parsedData.employees.find((emp) => emp.eId === eId);

    if (employee && Array.isArray(employee[nestedType])) {
      for (const item of employee[nestedType]!) {
        const idValue = +(item[idKey] || 0);
        maxId = Math.max(maxId, idValue);
      }
    }
  } else {
    const items = parsedData[type];
    maxId = Math.max(
      0,
      ...items.map((item) =>
        type === "employees"
          ? +(item as { eId: number }).eId
          : +(item as { id: string }).id
      )
    );
  }

  return maxId + 1;
};

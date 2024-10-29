// ** Types
import { ITypeJSON } from "@/const/types";

export const assignMissingIds = (parsedData: ITypeJSON, type: "employees" | "benefits") => {
  let maxId = 0;

  for (const item of parsedData[type]) {
    const id = type === "employees"
      ? (item as { eId: number }).eId
      : (item as { id: string }).id;

    if (id) {
      maxId = Math.max(maxId, +id);
    }
  }

  return maxId + 1;
};

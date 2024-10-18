import { ITypeJSON } from "@/const/types";

export const assignMissingIds = (parsedData: ITypeJSON) => {

  let maxId = 0;
  for (let i = 0; i < parsedData.benefits.length; i++) {
    const id = parsedData.benefits[i].id;
    if (id) {
      maxId = Math.max(maxId, +id);
    }
  }

  for (let i = 0; i < parsedData.benefits.length; i++) {
    if (!parsedData.benefits[i].id) {
      maxId += 1;
      parsedData.benefits[i].id = String(maxId);
    }
  }
};
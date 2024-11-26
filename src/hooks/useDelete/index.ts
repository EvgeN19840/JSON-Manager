import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useModal } from "@/hooks/useModal";
import { ITypeJSON } from "@/const/types";


interface IUseHandleDeleteItemParams {
  id: string | number;
  type: "employees" | "benefits" | "item";
  eId?: string | number;
  nestedType?:
  | "salary"
  | "employmentStatus"
  | "jobInfo"
  | "depositAccounts"
  | "benefits"
  | "bonuses"
  | "reimbursements"
  | "otherDeductions"
}

export const useHandleDeleteItem = () => {
  const { setData, data } = useDataStateContext();
  const { setDataForDialog } = useModal();

  const handleDeleteItem = ({
    id,
    type,
    eId,
    nestedType,
  }: IUseHandleDeleteItemParams): void => {
    const updatedData: ITypeJSON = { ...data };

    if (type === "employees") {
      updatedData.employees = updatedData.employees.filter(
        (emp) => emp.eId !== id
      );
      const updatedEmployee = updatedData.employees.find(
        (emp) => emp.eId === eId
      );
      if (updatedEmployee) {
        setDataForDialog(updatedEmployee);
      }
    } else if (type === "benefits") {
      updatedData.benefits = updatedData.benefits.filter((ben) => ben.id !== id);
      setDataForDialog(updatedData.benefits);
    } else if (type === "item" && eId && nestedType) {
      updatedData.employees = updatedData.employees.map((emp) =>
        emp.eId === eId
          ? {
            ...emp,
            [nestedType]: emp[nestedType]?.filter((item) => {
              if ("customBambooTalbeRowId" in item) {
                return item.customBambooTalbeRowId !== id;
              } else if ("id" in item) {
                return item.id !== id;
              }
              return true;
            }),
          }
          : emp
      );
      const updatedEmployee = updatedData.employees.find(
        (emp) => emp.eId === eId
      );
      if (updatedEmployee) {
        setDataForDialog({
          ...updatedEmployee,
          [nestedType]: updatedEmployee[nestedType] || [],
        });
      }
    }
    setData(updatedData);
  };
  return handleDeleteItem;
};

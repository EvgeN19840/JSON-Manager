// ** React
import { ReactNode, useState } from "react";

// ** Context
import { DataStateContext } from "../dataStateContext";

// ** Types
import {
  IEmployee,
  IEmployeeBenefit,
  ISystemBenefit,
  ITypeJSON,
} from "@/const/types";

// ** Utils
import { assignMissingIds } from "@/shared/utils";

export const DataStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ITypeJSON>({
    employees: [],
    benefits: [],
  });
  const [parsedData, setParsedData] = useState<string | null>(null);

  const handleSaveEmployee = (value: IEmployee) => {
    const employeeIndex = data.employees.findIndex(
      (emp) => emp.eId === value.eId
    );
    const updatedEmployees = [...data.employees];
    updatedEmployees[employeeIndex] = value;
    setData({ ...data, employees: updatedEmployees });
  };

  const handleSaveBenefit = (value: ISystemBenefit) => {
    const benefitIndex = data.benefits.findIndex((ben) => ben.id === value.id);
    const updatedBenefits = [...data.benefits];
    updatedBenefits[benefitIndex] = value;
    setData({ ...data, benefits: updatedBenefits });
  };
const handleSaveData = <T extends { id: string | number }>(
  value: T,
  type: "employeeBenefit" | "depositAccount" | "bonuses" 
) => {
  setData((prevData) => {
    switch (type) {
      case "employeeBenefit":
        return {
          ...prevData,
          employees: prevData.employees.map((emp) =>
            emp.benefits.some((ben) => ben.id === value.id)
              ? {
                  ...emp,
                  benefits: emp.benefits.map((ben) =>
                    ben.id === value.id ? { ...ben, ...value } : ben
                  ),
                }
              : emp
          ),
        };
      case "depositAccount":
        return {
          ...prevData,
          employees: prevData.employees.map((emp) =>
            emp.depositAccounts.some((acc) => acc.id === value.id)
              ? {
                  ...emp,
                  depositAccounts: emp.depositAccounts.map((acc) =>
                    acc.id === value.id ? { ...acc, ...value } : acc
                  ),
                }
              : emp
          ),
        };

      default:
        return prevData; 
    }
  });
};

  
  
const handleDeleteItem = (
  id:  string | number ,
  type: "employees" | "benefits" | "item",
  eId?:  string | number 
) => {
  setData((prevData) => {
    if (type === "employees") {
      return {
        ...prevData,
        employees: prevData.employees.filter((emp) => emp.eId !== id),
      };
    } else if (type === "benefits") {
      return {
        ...prevData,
        benefits: prevData.benefits.filter((ben) => ben.id !== id),
      };
    } else if (type === "item" && eId) {
      return {
        ...prevData,
        employees: prevData.employees.map((emp) =>
          emp.eId === eId
            ? {
                ...emp,
                benefits: emp.benefits.filter((benefit) => benefit.id !== id),
              }
            : emp
        ),
      };
    } else {
      console.error("Invalid type for deletion or missing eId.");
      return prevData;
    }
  });
};


  const handleAddItem = (
    item: IEmployee | ISystemBenefit | IEmployeeBenefit,
    type: "employees" | "benefits" | "item",
    eId?: number | string
  ) => {
    if (type === "employees" && "eId" in item) {
      const newEmployeeId = assignMissingIds(data, "employees");
      const similarEmployees = data.employees.filter((emp) =>
        emp.firstName.startsWith(item.firstName)
      );
      const nextIndex = similarEmployees.length + 1;
  
      const newEmployee: IEmployee = {
        ...item,
        eId: newEmployeeId,
        firstName: `${item.firstName}_${nextIndex}`,
      };
      setData((prevData) => ({
        ...prevData,
        employees: [...prevData.employees, newEmployee],
      }));
    } else if (type === "benefits" && "id" in item) {
      const newBenefitId = assignMissingIds(data, "benefits");
      const similarBenefits = data.benefits.filter((benefit) =>
        benefit.name.startsWith(item.name)
      );
      const nextIndex = similarBenefits.length + 1;
      const newBenefit: ISystemBenefit = {
        ...item,
        id: newBenefitId.toString(),
        name: `${item.name}_${nextIndex}`,
      };
      setData((prevData) => ({
        ...prevData,
        benefits: [...prevData.benefits, newBenefit],
      }));
    } else if (type === "item" && eId && "id" in item && "value" in item) {
      const newBenefitId = assignMissingIds(data, "benefits");
  
      const updatedBenefit: IEmployeeBenefit = {
        ...(item as IEmployeeBenefit),
        id: newBenefitId.toString(),
      };
  
      setData((prevData) => {
        const updatedEmployees = prevData.employees.map((emp) =>
          emp.eId === Number(eId)
            ? {
                ...emp,
                benefits: [...emp.benefits, updatedBenefit],
              }
            : emp
        );
  
        const isBenefitNew = !prevData.benefits.some(
          (benefit) => benefit.id === updatedBenefit.id
        );
  
        const updatedBenefits = isBenefitNew
          ? [...prevData.benefits, { id: updatedBenefit.id, name: updatedBenefit.name }]
          : prevData.benefits;
  
        return {
          ...prevData,
          employees: updatedEmployees,
          benefits: updatedBenefits,
        };
      });
    }
  };
  

  const hasData = !!(data?.benefits?.length || data?.employees?.length);

  return (
    <DataStateContext.Provider
      value={{
        data,
        setData,
        parsedData,
        setParsedData,
        handleSaveEmployee,
        handleSaveBenefit,
        handleDeleteItem,
        handleAddItem,
        handleSaveData,
        hasData,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};

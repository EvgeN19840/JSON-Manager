// ** React
import { ReactNode, useState } from "react";

// ** Context
import { DataStateContext } from "../dataStateContext";

// ** Types
import { IEmployee, ISystemBenefit, ITypeJSON } from "@/const/types";

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

  const handleDeleteItem = (
    id: number | string,
    type: "employees" | "benefits"
  ) => {
    if (type === "employees") {
      setData((prevData) => ({
        ...prevData,
        employees: prevData.employees.filter((emp) => emp.eId !== id),
      }));
    } else if (type === "benefits") {
      setData((prevData) => ({
        ...prevData,
        benefits: prevData.benefits.filter((ben) => ben.id !== id),
      }));
    }
  };

  const handleAddItem = (
    item: IEmployee | ISystemBenefit,
    type: "employees" | "benefits"
  ) => {
    if (type === "employees" && "eId" in item) {
      const newEmployeeId = assignMissingIds(data, "employees");
      const similarEmployees = data.employees.filter((emp) =>
        emp.firstName.startsWith(item.firstName)
      );
      const nextIndex = similarEmployees.length + 0;

      const newEmployee: IEmployee = {
        ...item,
        eId: newEmployeeId,
        firstName: `${item.firstName}+${nextIndex}`,
      };
      setData((prevData) => ({
        ...prevData,
        employees: [...prevData.employees, newEmployee],
      }));
    } else if (type === "benefits" && "id" in item) {
      const newBenefitId = assignMissingIds(data, "benefits");
      const similarBenefits = data.benefits.filter((emp) =>
        emp.name.startsWith(item.name)
      );
      const nextIndex = similarBenefits.length + 0;
      const newBenefit: ISystemBenefit = {
        ...item,
        id: newBenefitId.toString(),
        name: `${item.name}+${nextIndex}`,
      };
      setData((prevData) => ({
        ...prevData,
        benefits: [...prevData.benefits, newBenefit],
      }));
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
        hasData,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};

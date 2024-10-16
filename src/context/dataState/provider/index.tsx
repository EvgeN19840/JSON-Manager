import { ReactNode, useState } from "react";
import { Employee, ITypeJSON } from "@/const/types";
import { DataStateContext } from "../dataStateContext";

export const DataStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ITypeJSON | null>(null);
  const [parsedData, setParsedData] = useState<string | null>(null);
  const handleSave = (updatedEmployee: Employee) => {
    if (!data || data.benefits.length === 0 || data.employees.length === 0) {
      console.log("Data empty.");
      return;
    }
    const employeeIndex = data.employees.findIndex(
      (emp: Employee) => emp.eId === updatedEmployee.eId
    );

    const updatedEmployees = [...data.employees];
    if (employeeIndex >= 0) {
      updatedEmployees[employeeIndex] = updatedEmployee;
    } else {
      updatedEmployees.push(updatedEmployee);
    }

    const updatedData: ITypeJSON = {
      ...data,
      employees: updatedEmployees,
    };

    setData(updatedData);
  };
  const hasData = !!(data?.benefits?.length && data?.employees?.length);
  return (
    <DataStateContext.Provider
      value={{
        data,
        setData,
        parsedData,
        setParsedData,
        handleSave,
        hasData
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};

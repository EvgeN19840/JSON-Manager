import { ReactNode, useState } from "react";
import { Employee, ITypeJSON } from "@/const/types";
import { DataStateContext } from "../dataStateContext";

export const DataStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ITypeJSON>({ employees: [], benefits: [] });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<string | null>(null);

  const handleSave = (updatedEmployee: Employee) => {
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

  return (
    <DataStateContext.Provider
      value={{
        data,
        setData,
        openDialog,
        setOpenDialog,
        parsedData,
        setParsedData,
        handleSave, 
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};

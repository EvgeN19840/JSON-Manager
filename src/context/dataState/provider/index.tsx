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


  const handleDeleteEmployee = (eId: number) => {
    const updatedEmployees = data.employees.filter(
      (emp) => emp.eId !== eId
    );
    setData({ ...data, employees: updatedEmployees });
  };

  const handleAddEmployee = (employee: IEmployee) => {
    const newEmployeeId = assignMissingIds(data, "employees");
    const newEmployee: IEmployee = {
      ...employee,
      eId: newEmployeeId,
      firstName: `${employee.firstName}+1`,
    };
    setData((prevData) => ({
      ...prevData,
      employees: [...prevData.employees, newEmployee],
    }));
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
        handleAddEmployee,
        handleDeleteEmployee,
        hasData,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};

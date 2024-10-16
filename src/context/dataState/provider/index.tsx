import { ReactNode, useState } from "react";
import { Employee, ITypeJSON, SystemBenefit } from "@/const/types";
import { DataStateContext } from "../dataStateContext";

export const DataStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ITypeJSON | null>(null);
  const [parsedData, setParsedData] = useState<string | null>(null);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<SystemBenefit | null>(null);

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    if (!data || !data.employees.length) {
      console.log("Employee data is empty.");
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

    setData({
      ...data,
      employees: updatedEmployees,
    });
  };

  const handleSaveBenefit = (updatedBenefit: SystemBenefit) => {
    if (!data || !data.benefits.length) {
      console.log("Benefit data is empty.");
      return;
    }

    const benefitIndex = data.benefits.findIndex(
      (ben: SystemBenefit) => ben.id === updatedBenefit.id
    );

    const updatedBenefits = [...data.benefits];
    if (benefitIndex >= 0) {
      updatedBenefits[benefitIndex] = updatedBenefit;
    } else {
      updatedBenefits.push(updatedBenefit);
    }

    setData({
      ...data,
      benefits: updatedBenefits,
    });
  };
  const hasData = !!(data?.benefits?.length || data?.employees?.length);
  return (
    <DataStateContext.Provider
      value={{
        data,
        setData,
        parsedData,
        setParsedData,
        selectedEmployee,
        setSelectedEmployee,
        selectedBenefit,
        setSelectedBenefit,
        handleSaveEmployee,
        handleSaveBenefit,
        hasData,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};

// ** React
import { ReactNode, useState } from "react";

// ** Context
import { DataStateContext } from "../dataStateContext";

// ** Types
import { IEmployee, ISystemBenefit, ITypeJSON } from "@/const/types";

export const DataStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ITypeJSON>({
    employees: [],
    benefits: [],
  });
  const [parsedData, setParsedData] = useState<string | null>(null);
  const [eIdSetectedEmploee, setEIdSetectedEmploee] = useState<number | null>(
    null
  );

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
  const handleSaveData = <
    T extends Partial<{
      id: string | number;
      eId: number;
      customBambooTalbeRowId: number;
    }>
  >(
    value: T,
    type:
      | "employeeBenefit"
      | "depositAccount"
      | "bonuses"
      | "personal"
      | "jobInfo"
      | "salary"
      | "status"
      | "reimbursements"
      | "otherDeductions"
  ) => {
    setData((prevData) => ({
      ...prevData,
      employees: prevData.employees.map((employee) => {
        if (employee.eId !== eIdSetectedEmploee) return employee;
        switch (type) {
          case "jobInfo":
            return {
              ...employee,
              jobInfo: employee.jobInfo.map((info) =>
                info.customBambooTalbeRowId === value.customBambooTalbeRowId
                  ? { ...info, ...value }
                  : info
              ),
            };
          case "salary":
            return {
              ...employee,
              salary: employee.salary.map((item) =>
                item.customBambooTalbeRowId === value.customBambooTalbeRowId
                  ? { ...item, ...value }
                  : item
              ),
            };
          case "status":
            return {
              ...employee,
              employmentStatus: employee.employmentStatus.map((status) =>
                status.customBambooTalbeRowId === value.customBambooTalbeRowId
                  ? { ...status, ...value }
                  : status
              ),
            };
          case "personal":
            return { ...employee, ...value };
          case "employeeBenefit":
            return {
              ...employee,
              benefits: employee.benefits.map((benefit) =>
                benefit.id === value.id ? { ...benefit, ...value } : benefit
              ),
            };
          case "bonuses":
            return {
              ...employee,
              bonuses: employee.bonuses.map((bonus) =>
                bonus.customBambooTalbeRowId === value.customBambooTalbeRowId
                  ? { ...bonus, ...value }
                  : bonus
              ),
            };
          case "depositAccount":
            return {
              ...employee,
              depositAccounts: employee.depositAccounts.map((account) =>
                account.customBambooTalbeRowId === value.customBambooTalbeRowId
                  ? { ...account, ...value }
                  : account
              ),
            };
          case "reimbursements":
            return {
              ...employee,
              reimbursements: employee.reimbursements.map((account) =>
                account.customBambooTableRowId === value.customBambooTalbeRowId
                  ? { ...account, ...value }
                  : account
              ),
            };
          case "otherDeductions":
            return {
              ...employee,
              otherDeductions: employee.otherDeductions.map((account) =>
                account.customBambooTableRowId === value.customBambooTalbeRowId
                  ? { ...account, ...value }
                  : account
              ),
            };

          default:
            return employee;
        }
      }),
    }));
  };

  const hasData = !!(data?.benefits?.length || data?.employees?.length);

  return (
    <DataStateContext.Provider
      value={{
        data,
        setData,
        parsedData,
        eIdSetectedEmploee,
        setEIdSetectedEmploee,
        setParsedData,
        handleSaveEmployee,
        handleSaveBenefit,
        handleSaveData,
        hasData,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};

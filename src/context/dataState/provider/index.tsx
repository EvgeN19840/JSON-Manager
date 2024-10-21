import { ReactNode, useState } from "react";
import { IEmployee, ITypeJSON } from "@/const/types";
import { DataStateContext } from "../dataStateContext";

export const DataStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ITypeJSON>({
    employees: [],
    benefits: []
  });
  const [parsedData, setParsedData] = useState<string | null>(null);

  const handleSaveEmployee = (value: IEmployee) => {
    const employeeIndex = data.employees.findIndex((emp) => emp.eId === value.eId);
    const updatedEmployees = [...data.employees];
    updatedEmployees[employeeIndex] = value;
    setData({ ...data, employees: updatedEmployees })
  };

  const handleSaveBenefit = () => {
    // if (!data || !data.benefits.length || !selectedBenefit) {
    //   console.log("Benefit data is empty or not selected.");
    //   return;
    // }
    // const updatedBenefit = {
    //   ...selectedBenefit,
    //   name: benefitName,
    //   id: benefitID,
    // };
    // const benefitIndex = data.benefits.findIndex(
    //   (ben: ISystemBenefit) => ben.id === selectedBenefit.id
    // );

    // const updatedBenefits = [...data.benefits];
    // if (benefitIndex >= 0) {
    //   updatedBenefits[benefitIndex] = updatedBenefit;
    // } else {
    //   updatedBenefits.push(updatedBenefit);
    // }

    // setData({
    //   ...data,
    //   benefits: updatedBenefits,
    // });
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
        hasData,
      }}
    >
      {children}
    </DataStateContext.Provider>
  );
};

import { useState, useEffect } from "react";
import { EditForm } from "../editForm";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useModal } from "@/hooks/useModal";

export const EditFormWrapper: React.FC = () => {
  const {
    selectedEmployee,
    selectedBenefit,
    handleSaveEmployee,
    handleSaveBenefit,
  } = useDataStateContext();
  const { setEditDialogOpen } = useModal();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [benefitName, setBenefitName] = useState<string>("");
  const [benefitID, setBenefitID] = useState<string>("");

  useEffect(() => {
    if (selectedEmployee) {
      setFirstName(selectedEmployee.firstName || "");
      setLastName(selectedEmployee.lastName || "");
    } else {
      setFirstName("");
      setLastName("");
    }

    if (selectedBenefit) {
      setBenefitName(selectedBenefit.name || "");
      setBenefitID(selectedBenefit.id || "");
    } else {
      setBenefitName("");
      setBenefitID("");
    }
  }, [selectedEmployee, selectedBenefit]);

  const saveData = () => {
    if (selectedBenefit) {
      handleSaveBenefit(benefitName, benefitID);
    }
    else if (selectedEmployee) {
      handleSaveEmployee(firstName, lastName);
    } 
    setEditDialogOpen(false);
  };

  return (
    <EditForm
      employeeData={{ firstName, lastName }}
      setEmployeeData={({ firstName, lastName }) => {
        setFirstName(firstName);
        setLastName(lastName);
      }}
      benefitData={{ name: benefitName, id: benefitID }}
      setBenefitData={({ name, id }) => {
        setBenefitName(name);
        setBenefitID(id);
      }}
      saveData={saveData}
    />
  );
};

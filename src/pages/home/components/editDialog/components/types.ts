export interface EditFormProps {
    employeeData: { firstName: string; lastName: string };
    setEmployeeData: (data: { firstName: string; lastName: string }) => void;
    benefitData: { name: string; id: string };
    setBenefitData: (data: { name: string; id: string }) => void;
    saveData: () => void;
}

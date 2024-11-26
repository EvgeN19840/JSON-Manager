import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useModal } from "@/hooks/useModal";
import {
    IBonuses,
    IDepositAccounts,
    IEmployee,
    IEmployeeBenefit,
    IEmploymentStatus,
    IJobInfo,
    IOtherDeduction,
    IReimbursement,
    ISalary,
    ISystemBenefit,
    ITypeJSON,
} from "@/const/types";
import { assignMissingIds } from "@/shared/utils";

interface IUseHandleAddItemParams {
    item: IEmployee | ISystemBenefit | ISalary | IJobInfo | IDepositAccounts | IEmploymentStatus | IEmployeeBenefit | IBonuses | IOtherDeduction |IReimbursement;
    type: "employees" | "benefits" | "item";
    eId?: string | number;
    nestedType?: "salary" | "employmentStatus" | "jobInfo" | "depositAccounts" | "benefits" | "bonuses" |"reimbursements";
}

export const useHandleAddItem = () => {
    const { setData } = useDataStateContext();
    const { setDataForDialog } = useModal();

    const handleAddItem = ({
        item,
        type,
        eId,
        nestedType,
    }: IUseHandleAddItemParams): void => {
        setData((prevData: ITypeJSON) => {
            const updatedData: ITypeJSON = { ...prevData };

            if (type === "employees" && "eId" in item) {
                const newEmployeeId = assignMissingIds(prevData, "employees");
                const similarEmployees = prevData.employees.filter((emp) =>
                    emp.firstName.startsWith(item.firstName)
                );
                const nextIndex = similarEmployees.length + 1;

                const newEmployee: IEmployee = {
                    ...item,
                    eId: newEmployeeId,
                    firstName: `${item.firstName}_${nextIndex}`,
                };

                updatedData.employees = [...prevData.employees, newEmployee];
                setDataForDialog(newEmployee);
            } else if (type === "benefits" && "id" in item) {
                const newBenefitId = assignMissingIds(prevData, "benefits");
                const similarBenefits = prevData.benefits.filter((benefit) =>
                    benefit.name.startsWith(item.name)
                );
                const nextIndex = similarBenefits.length + 1;

                const newBenefit: ISystemBenefit = {
                    ...item,
                    id: newBenefitId.toString(),
                    name: `${item.name}_${nextIndex}`,
                };

                updatedData.benefits = [...prevData.benefits, newBenefit];
                setDataForDialog(updatedData.benefits);
            } else if (type === "item" && eId && nestedType) {
                const idKey = "customBambooTalbeRowId" in item ? "customBambooTalbeRowId" : "id";
                const newNestedItemId = assignMissingIds(prevData, "employees", eId, nestedType, idKey);

                const newNestedItem = {
                    ...item,
                    [idKey]: newNestedItemId.toString(),
                };

                updatedData.employees = prevData.employees.map((emp) =>
                    emp.eId === eId
                        ? {
                            ...emp,
                            [nestedType]: [...(emp[nestedType] || []), newNestedItem],
                        }
                        : emp
                );

                const updatedEmployee = updatedData.employees.find(
                    (emp) => emp.eId === eId
                );

                if (updatedEmployee) {
                    setDataForDialog({
                        ...updatedEmployee,
                        [nestedType]: updatedEmployee[nestedType] || [],
                    });
                }
            }

            return updatedData;
        });
    };

    return handleAddItem;
};

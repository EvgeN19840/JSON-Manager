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
    item:
    | IEmployee
    | ISystemBenefit
    | ISalary
    | IJobInfo
    | IDepositAccounts
    | IEmploymentStatus
    | IEmployeeBenefit
    | IBonuses
    | IOtherDeduction
    | IReimbursement;
    type: "employees" | "benefits" | "item";
    eId?: string | number;
    nestedType?:
    | "salary"
    | "employmentStatus"
    | "jobInfo"
    | "depositAccounts"
    | "benefits"
    | "bonuses"
    | "reimbursements"
    | "otherDeductions";
}

export const useHandleAddItem = () => {
    const { setData, data } = useDataStateContext();
    const { setDataForDialog } = useModal();

    const handleAddItem = ({
        item,
        type,
        eId,
        nestedType,
    }: IUseHandleAddItemParams): void => {
        const updatedData: ITypeJSON = { ...data };
        if (type === "employees" && "eId" in item) {
            const newEmployeeId = assignMissingIds(data, "employees");
            const similarEmployees = data.employees.filter((emp) =>
                emp.firstName.startsWith(item.firstName)
            );
            const nextIndex = similarEmployees.length + 1;

            const newEmployee: IEmployee = {
                ...item,
                eId: newEmployeeId,
                firstName: `${item.firstName}_${nextIndex}`,
            };

            updatedData.employees = [...data.employees, newEmployee];
            setDataForDialog(newEmployee);
        } else if (type === "benefits" && "id" in item) {
            const newBenefitId = assignMissingIds(data, "benefits");
            const similarBenefits = data.benefits.filter((benefit) =>
                benefit.name.startsWith(item.name)
            );
            const nextIndex = similarBenefits.length + 1;

            const newBenefit: ISystemBenefit = {
                ...item,
                id: newBenefitId.toString(),
                name: `${item.name}_${nextIndex}`,
            };

            updatedData.benefits = [...data.benefits, newBenefit];
            setDataForDialog(updatedData.benefits);
        } else if (type === "item" && eId && nestedType) {
            const idKey =
                "customBambooTableRowId" in item
                    ? "customBambooTableRowId"
                    : "id";
            const newNestedItemId = assignMissingIds(
                data,
                "employees",
                eId,
                nestedType,
                idKey
            );

            const newNestedItem = {
                ...item,
                [idKey]: newNestedItemId.toString(),
            };

            updatedData.employees = data.employees.map((emp) =>
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

        setData(updatedData);
    };

    return handleAddItem;
};

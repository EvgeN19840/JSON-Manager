// ** Constants
import names from '@/constants/names'

// ** Utils
import { assignMissingIds } from '@/shared/utils'
import { saveEmployeeToLocalStorage } from '@/services/storageService'

// ** Hooks
import {
    useDataStateContext,
    useModal,
    useTabs
} from '@/pages/home/hooks'

// ** Types
import {
    IEmployee,
    ISystemBenefit,
    ITypeJSON
} from '@/types/json'
import { IUseHandleAddItemParams } from './types'



export const useHandleAddItem = () => {
    const { setData, data, countDuplicates } = useDataStateContext();
    const { setDataForDialog } = useModal();
    const { activeTab } = useTabs();


    const handleAddItem = ({
        item,
        type,
        eId,
        nestedType,
    }: IUseHandleAddItemParams): void => {
        const updatedData: ITypeJSON = { ...data };
        if (type === "employees" && "eId" in item) {
            const newEmployees: IEmployee[] = [];

            for (let i = 0; i < Number(countDuplicates); i++) {
                const newEmployeeId = assignMissingIds(data, "employees");
                const newEmployee: IEmployee = {
                    ...item,
                    eId: newEmployeeId + i,
                    firstName: names[Math.floor(Math.random() * names.length)],
                    lastName: names[Math.floor(Math.random() * names.length)],
                    number: `0${newEmployeeId + i}`
                };
                newEmployees.push(newEmployee);
                setDataForDialog(newEmployee);
                if (activeTab === "3") {
                    saveEmployeeToLocalStorage(newEmployee);
                }
            }

            updatedData.employees = [...data.employees, ...newEmployees];
            setData(updatedData);
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

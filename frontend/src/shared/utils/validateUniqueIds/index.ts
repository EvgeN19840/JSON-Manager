import { ITypeJSON } from "@/types/json";

export const validateUniqueIds = (data: ITypeJSON): ITypeJSON => {
    let globalIndex = 1;

    const resetIds = <T extends { customBambooTableRowId: number | null }>(items: T[] | undefined): T[] =>
        items?.map((item) => ({ ...item, customBambooTableRowId: null })) || [];

    const updatedData: ITypeJSON = {
        ...data,
        employees: data.employees.map((employee) => ({
            ...employee,
            depositAccounts: resetIds(employee.depositAccounts),
            reimbursements: resetIds(employee.reimbursements),
            loansAndSalaryAdvances: resetIds(employee.loansAndSalaryAdvances),
            otherDeductions: resetIds(employee.otherDeductions),
            salary: resetIds(employee.salary),
            jobInfo: resetIds(employee.jobInfo),
            employmentStatus: resetIds(employee.employmentStatus),
            bonuses: resetIds(employee.bonuses),
        })),
    };

    updatedData.employees.forEach((employee) => {
        const arraysToProcess = [
            employee.depositAccounts,
            employee.reimbursements,
            employee.loansAndSalaryAdvances,
            employee.otherDeductions,
            employee.salary,
            employee.jobInfo,
            employee.employmentStatus,
            employee.bonuses,
        ];

        arraysToProcess.forEach((items) => {
            items.forEach((item) => {
                item.customBambooTableRowId = globalIndex++;
            });
        });
    });

    return updatedData;
};

// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";

//** Types
import { IBonuses, IDepositAccounts, IEmployee, IEmploymentStatus, IFees, IJobInfo, IReimbursement, ISalary, ISystemBenefit } from "@/types/json";


export interface ContextMenuItem {
    name: string;
    callback: (params: GridRenderCellParams<IEmployee | ISystemBenefit | IJobInfo | IEmploymentStatus | ISalary | IBonuses | IDepositAccounts | IReimbursement | IFees>) => void;
    disabled?: boolean;
}

export interface MyContextMenuProps {
    items: ContextMenuItem[];
    params: GridRenderCellParams<
        IEmployee | ISystemBenefit | IJobInfo | IEmploymentStatus | ISalary | IDepositAccounts | IBonuses | IReimbursement | IFees
    >;
    disabled?: boolean;
}

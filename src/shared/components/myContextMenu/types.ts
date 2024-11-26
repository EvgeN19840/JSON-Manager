// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";

//** Types
import { IBonuses, IDepositAccounts, IEmployee, IEmploymentStatus, IJobInfo, IReimbursement, ISalary, ISystemBenefit } from "@/const/types";


export interface ContextMenuItem {
    name: string;
    callback: (params: GridRenderCellParams<IEmployee | ISystemBenefit | IJobInfo | IEmploymentStatus | ISalary | IBonuses | IDepositAccounts | IReimbursement>) => void;
    disabled?: boolean;
}

export interface MyContextMenuProps {
    items: ContextMenuItem[];
    params: GridRenderCellParams<
        IEmployee | ISystemBenefit | IJobInfo | IEmploymentStatus | ISalary | IDepositAccounts | IBonuses | IReimbursement
    >;
    disabled?: boolean;
}

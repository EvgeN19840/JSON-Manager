// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";

//** Types
import { IBonuses, IDepositAccounts, IEmployee, IEmploymentStatus, IJobInfo, ISalary, ISystemBenefit } from "@/const/types";


export interface ContextMenuItem {
    name: string;
    callback: (params: GridRenderCellParams<IEmployee | ISystemBenefit | IJobInfo | IEmploymentStatus | ISalary | IBonuses | IDepositAccounts>) => void;
    disabled?: boolean;
}

export interface MyContextMenuProps {
    items: ContextMenuItem[];
    params: GridRenderCellParams<
        IEmployee | ISystemBenefit | IJobInfo | IEmploymentStatus | ISalary | IDepositAccounts | IBonuses
    >;
    disabled?: boolean;
}

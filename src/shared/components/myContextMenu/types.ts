// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";

//** Types
import { IEmployee, IEmploymentStatus, IJobInfo, ISalary, ISystemBenefit } from "@/const/types";


export interface ContextMenuItem {
    name: string;
    callback: (params: GridRenderCellParams<IEmployee | ISystemBenefit  | IJobInfo | IEmploymentStatus | ISalary >) => void;
    disabled?: boolean;
}

export interface MyContextMenuProps {
    items: ContextMenuItem[];
    params: GridRenderCellParams<
        IEmployee | ISystemBenefit  | IJobInfo | IEmploymentStatus | ISalary
    >;
    disabled?: boolean;
}

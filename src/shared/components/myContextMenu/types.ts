// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";

//** Types
import { IEmployee, ISystemBenefit } from "@/const/types";

export interface ContextMenuItem {
    name: string;
    callback: (params: GridRenderCellParams<IEmployee | ISystemBenefit>) => void;
    disabled?: boolean;
}

export interface MyContextMenuProps {
    items: ContextMenuItem[];
    params: GridRenderCellParams<IEmployee | ISystemBenefit>;
    disabled?: boolean;
}
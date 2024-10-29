// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";

//** Types
import { IEmployee } from "@/const/types";

export interface ContextMenuItem {
    name: string;
    callback: (params: GridRenderCellParams<IEmployee>) => void;
    disabled?: boolean;
}

export interface MyContextMenuProps {
    items: ContextMenuItem[];
    params: GridRenderCellParams<IEmployee>;
    disabled?: boolean;
}
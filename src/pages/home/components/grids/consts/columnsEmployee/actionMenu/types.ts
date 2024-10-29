// ** Types
import { IEmployee } from "@/const/types";

// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";


export type contextMenuItemsCallbacks = {
    openForm: (rowData: GridRenderCellParams<IEmployee>) => void;
    deleteEmployee: (rowData: GridRenderCellParams<IEmployee>) => void;
    addEmployee: (rowData: GridRenderCellParams<IEmployee>) => void;
  };
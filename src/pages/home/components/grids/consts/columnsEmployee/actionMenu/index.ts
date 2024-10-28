// ** Types

import { IEmployee } from "@/const/types";
import { GridRenderCellParams } from "@mui/x-data-grid"


// ** Types for context menu callbacks
export type contextMenuItemsCallbacks = {
    openForm: (rowData: GridRenderCellParams<IEmployee>) => void;
    deleteEmployee: (rowData: GridRenderCellParams<IEmployee>) => void;
    addEmployee: (rowData: GridRenderCellParams<IEmployee>) => void;
  }
  
  // ** Action menu function
  export const actionMenu = (callbacks: contextMenuItemsCallbacks, params: GridRenderCellParams<IEmployee>) => {
    return [
      {
        name: 'Edit',
        callback: () => callbacks.openForm(params) 
      },
      {
        name: 'Delete',
        callback: () => callbacks.deleteEmployee(params), 

      },
      {
        name: 'Add',
        callback: () => callbacks.addEmployee(params), 

      }
    ];
  }
  
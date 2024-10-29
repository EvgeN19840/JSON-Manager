// ** Types
import { IEmployee } from "@/const/types";
import { contextMenuItemsCallbacks } from "./types";

// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";

export const actionMenu = (
  callbacks: contextMenuItemsCallbacks,
  params: GridRenderCellParams<IEmployee>
) => [
    {
      name: "Edit",
      callback: () => callbacks.openForm(params),
    },
    {
      name: "Duplicate",
      callback: () => callbacks.addEmployee(params),
    },
    {
      name: "Delete",
      callback: () => callbacks.deleteEmployee(params),
    },
  ];

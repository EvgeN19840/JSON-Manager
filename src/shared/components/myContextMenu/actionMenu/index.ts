// ** Types
import { IEmployee, ISystemBenefit } from "@/const/types";
import { contextMenuItemsCallbacks } from "./types";

// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";

export const actionMenu = (
  callbacks: contextMenuItemsCallbacks,
  params: GridRenderCellParams<IEmployee | ISystemBenefit>
) => [
  {
    name: "Edit",
    callback: () => callbacks.openForm(params.row),
  },
  {
    name: "Duplicate",
    callback: () => callbacks.addItem(params.row),
  },
  {
    name: "Delete",
    callback: () => callbacks.deleteItem(params.row),
  },
];

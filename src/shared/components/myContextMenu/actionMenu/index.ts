import { GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid";
import { ContextMenuItemsCallbacks } from "./types";

export const actionMenu = <T extends GridValidRowModel>(
  callbacks: ContextMenuItemsCallbacks<T>,
  params: GridRenderCellParams<T>,
  nameDetails?: boolean

) => {
  const name = nameDetails ? "Details" : "Edit";
  return [
    {
      name: name,
      callback: () => callbacks.openForm(params.row),
    },
    {
      name: "Duplicate",
      callback: () => {
        if (callbacks.onDuplicate) {
          callbacks.onDuplicate(params.row);
        } else {
          callbacks.addItem(params.row);
        }
      },
    },
    {
      name: "Delete",
      callback: () => callbacks.deleteItem(params.row),
    },
  ];
};
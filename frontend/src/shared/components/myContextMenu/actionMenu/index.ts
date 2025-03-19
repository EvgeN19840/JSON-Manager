import { GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid";
import { ContextMenuItemsCallbacks } from "./types";

export const actionMenu = <T extends GridValidRowModel>(
  callbacks: ContextMenuItemsCallbacks<T>,
  params: GridRenderCellParams<T>,
  nameDetails?: boolean,
  isTemplateMode?: boolean
) => {
  const name = nameDetails ? "Details" : "Edit";

  const menuItems = [
    {
      name: name,
      callback: () => callbacks.openForm(params.row),
    },
  ];

  if (isTemplateMode) {
    menuItems.push(
      {
        name: "Save employee template",
        callback: () => {
          if (callbacks.saveEmployee) {
            callbacks.saveEmployee(params.row);
          }
        },
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
        name: "Remove employee template",
        callback: () => {
          if (callbacks.removeEmployee) {
            callbacks.removeEmployee(params.row);
          }
        },
      }
    );
  } else {
    if (name === "Details") {
      menuItems.push({
        name: "Save employee template",
        callback: () => {
          if (callbacks.saveEmployee) {
            callbacks.saveEmployee(params.row);
          }
        },
      },)
    }
    menuItems.push(
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
        callback: () => {
          if (callbacks.deleteItem) {
            callbacks.deleteItem(params.row);
          }
        },
      }
    );
  }

  return menuItems;
};
import { GridValidRowModel } from "@mui/x-data-grid";

export interface ContextMenuItemsCallbacks<T extends GridValidRowModel> {
  openForm: (data: T) => void;
  addItem: (data: T) => void;
  deleteItem: (data: T) => void;
  onDuplicate?: (item: T) => void;
  saveEmployee?: (item: T) => void;
}

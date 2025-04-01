// ** MUI
import {  GridColDef, GridValidRowModel } from "@mui/x-data-grid";

export interface IMyGridProps<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  data: T[];
  onRowDoubleClick: (row: T) => void;
}
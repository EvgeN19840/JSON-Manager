import { GridColDef } from "@mui/x-data-grid";
import { IRows } from "../types";

export const columns: GridColDef<IRows>[] = [
  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 1,
    editable: true,
  },
];

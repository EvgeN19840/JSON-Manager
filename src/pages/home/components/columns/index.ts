import { Employee } from "@/const/types";
import { GridColDef } from "@mui/x-data-grid";


export const columns: GridColDef<Employee>[] = [
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

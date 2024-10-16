import { Employee } from "@/const/types";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef } from "@mui/x-data-grid";

export const ColumnsBenefit = (
  handleEditClick: (employee: Employee) => void
): GridColDef<Employee>[] => [
  {
    field: "name",
    headerName: "Benefit Name",
    flex: 1,
    editable: true,
    minWidth:250,
    resizable: false,
  },
  {
    field: "id",
    headerName: "Id",
    flex: 1,
    editable: true,
    resizable: false,
    minWidth:250,
  },
  {
    field: "edit",
    headerName: "",
    width: 30,
    sortable: false,
    resizable: false,
    filterable: false,
    align: "center",
    renderCell: (params) => (
      <IconButton size="small" onClick={() => handleEditClick(params.row)}>
        <EditIcon />
      </IconButton>
    ),
  },
];

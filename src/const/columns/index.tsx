import { Employee } from "@/const/types";
import { EditButton } from "@/pages/home/components/editDialog/components/editButton";
import { GridColDef } from "@mui/x-data-grid";


export const columns = (handleEditClick: (employee: Employee) => void): GridColDef<Employee>[] => [
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
  {
    field: 'edit',
    headerName: '',
    width: 30,
    sortable: false,
    filterable: false,
    align: 'center',
    renderCell: (params) => (
      <EditButton onClick={() => handleEditClick(params.row)} />
    ),
  }
];


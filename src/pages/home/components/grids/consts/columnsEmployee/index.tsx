// ** Type
import { IEmployee } from "@/const/types";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Components
import { EditButton } from "@/shared/components/grid/components";

export const ColumnsEmployee = (
  handleEditClick: (employee: IEmployee) => void
): GridColDef<IEmployee>[] => [
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
      editable: true,
      minWidth: 250,
      resizable: false,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      editable: true,
      resizable: false,
      minWidth: 250,
    },
    {
      field: "edit",
      headerName: "",
      width: 30,
      sortable: false,
      resizable: false,
      filterable: false,
      align: "center",
      renderCell: (params: GridRenderCellParams<IEmployee>) => (
        <EditButton<IEmployee> params={params} handleEditClick={handleEditClick} />
      )
    },
  ];

// ** Types
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ISystemBenefit } from "@/const/types";

// ** Components
import { EditButton } from "@/shared/components/grid/components";


export const ColumnsBenefit = (
  handleEditClick: (employee: ISystemBenefit) => void
): GridColDef<ISystemBenefit>[] => [
    {
      field: "name",
      headerName: "Benefit Name",
      flex: 1,
      editable: true,
      minWidth: 250,
      resizable: false,
    },
    {
      field: "id",
      headerName: "Id",
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
      renderCell: (params: GridRenderCellParams<ISystemBenefit>) => (
        <EditButton<ISystemBenefit> params={params} handleEditClick={handleEditClick} />
      )
    },
  ];

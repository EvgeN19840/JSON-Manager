// ** Types
import { IEmployee } from "@/const/types";
import { contextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";

// ** MUI
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Components
import { actionMenu } from "@/shared/components/myContextMenu/actionMenu";
import { MyContextMenu } from "@/shared/components/myContextMenu";

export const ColumnsEmployee = (
  _handleEditClick: (employee: IEmployee) => void,
  callbacks: contextMenuItemsCallbacks
): GridColDef<IEmployee>[] => [
  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
    editable: false,
    minWidth: 250,
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 1,
    editable: false,
    minWidth: 250,
  },
  {
    field: "eId",
    headerName: "Id",
    flex: 1,
    editable: false,
    minWidth: 250,
  },
  {
    field: "Actions",
    width: 35,
    align: "center",
    renderHeader: () => "",
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IEmployee>) => (
      <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
    ),
  },
];

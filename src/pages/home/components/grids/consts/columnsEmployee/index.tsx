// ** Types
import { IEmployee } from "@/const/types";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Components
import { actionMenu, contextMenuItemsCallbacks } from "./actionMenu";
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
    width: 35,
    minWidth: 35,
    maxWidth: 35,
    resizable: false,
    field: 'Actions',
    renderHeader: () => '',
    sortable: false,
    hideable: false,
    filterable: false,
    align: 'center',
    renderCell: (params: GridRenderCellParams<IEmployee>) => {
      return (
        <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
      );
    },
  },
];

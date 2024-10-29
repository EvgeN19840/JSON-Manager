// ** Types
import { contextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { ISystemBenefit } from "@/const/types";

// ** MUI
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Components
import { MyContextMenu } from "@/shared/components/myContextMenu";
import { actionMenu } from "@/shared/components/myContextMenu/actionMenu";

export const ColumnsBenefit = (
  _handleEditClick:  (employee: ISystemBenefit) => void,
  callbacks: contextMenuItemsCallbacks
): GridColDef<ISystemBenefit>[] => [
    {
      field: "name",
      headerName: "Benefit Name",
      flex: 1,
      editable: false, 
      minWidth: 250,
      resizable: false,
    },
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      editable: false, 
      resizable: false,
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
      renderCell: (params: GridRenderCellParams<ISystemBenefit>) => {
        return (
          <MyContextMenu items={actionMenu(callbacks, params)} params={params} />
        );
      },
    },
  ];

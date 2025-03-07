// ** Types
import { IEmployee } from "@/const/types";

// ** MUI
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Components
import { actionMenu } from "@/shared/components/myContextMenu/actionMenu";
import { MyContextMenu } from "@/shared/components/myContextMenu";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";

export const ColumnsTemplate = (
  _handleEditClick: (employee: IEmployee) => void,
  callbacks: ContextMenuItemsCallbacks<IEmployee>,
  isTemplateMode: boolean
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
    field: "Actions",
    width: 50,
    align: "center",
    renderHeader: () => "",
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<IEmployee>) => {
      return (
        <MyContextMenu
          items={actionMenu(
            {
              ...callbacks,
              saveEmployee: (employee) => callbacks.saveEmployee?.(employee),
              removeEmployee: (employee) =>
                callbacks.removeEmployee?.(employee),
            },
            params,
            true,
            isTemplateMode
          )}
          params={params}
        />
      );
    },
  },
];

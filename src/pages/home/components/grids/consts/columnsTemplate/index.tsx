// ** Types
import { IEmployee } from "@/const/types";

// ** MUI
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Components
import { actionMenu } from "@/shared/components/myContextMenu/actionMenu";
import { MyContextMenu } from "@/shared/components/myContextMenu";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { InputField } from "@/shared/inputField";
import { useDataStateContext } from "@/hooks/useDataStateContext";

export const ColumnsTemplate = (
  _handleEditClick: (employee: IEmployee) => void,
  callbacks: ContextMenuItemsCallbacks<IEmployee>,
  isTemplateMode: boolean
): GridColDef<IEmployee>[] => {
  const { data, setData } = useDataStateContext();

  return [
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
      field: "comment",
      headerName: "Comment",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IEmployee>) => {
        return (
          <InputField
            value={params.row.comment || ""}
            placeholder="Type your comment..."
            noBorderRadius={true} 
            onChange={(event) => {
              const newComment = event.target.value;
              if (!data?.employees) return;
              setData((prevData) => ({
                ...prevData,
                employees: prevData.employees.map((emp) =>
                  emp.eId === params.row.eId
                    ? { ...emp, comment: newComment || "" }
                    : emp
                ),
              }));
            }}
          />
        );
      },
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
                onDuplicate: (employee) => callbacks.onDuplicate?.(employee),
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
};

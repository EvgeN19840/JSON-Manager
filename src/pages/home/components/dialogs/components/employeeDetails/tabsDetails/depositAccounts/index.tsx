// ** MUI
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types and Columns
import { IDepositAccounts } from "@/const/types";
import { ColumnsAccounts } from "./columnsAccounts";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { useHandleAddItem } from "@/hooks/useAddItem";
import { useHandleDeleteItem } from "@/hooks/useDelete";
import { CustomFooter } from "@/shared/components/customFooter";
import { useDefaultDepositAccounts } from "@/hooks/useDefaultData";

export const DepositAccountTab: React.FC = () => {
  const { handleClickOpenDialog, dataForDialog, setTypeModalDetailsEdit } =
    useModal();
  const dialogData = dataForDialog as { eId: number } | null;
  const { data } = useDataStateContext();
  const defaultValues = useDefaultDepositAccounts();
  const handleDeleteItem = useHandleDeleteItem();
  const handleAddItem = useHandleAddItem();
  const getDepostAccountRows = (): IDepositAccounts[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find((emp) => emp.eId === dialogData.eId);
      return employee?.depositAccounts || [];
    }
    return [];
  };
  const depositAccountCallbacks: ContextMenuItemsCallbacks<IDepositAccounts> = {
    openForm: (data) => {
      handleClickOpenDialog("Edit Details", data);
      setTypeModalDetailsEdit("Edit deposit accounts");
    },
    addItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: "item",
          eId: dialogData.eId,
          nestedType: "depositAccounts",
        });
      }
    },
    deleteItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTalbeRowId,
          type: "item",
          eId: dialogData.eId,
          nestedType: "depositAccounts",
        });
      }
    },
  };
  const employmentStatusColumns = ColumnsAccounts(
    depositAccountCallbacks.openForm,
    depositAccountCallbacks
  );
  const addNewRow = () => {
    handleClickOpenDialog("Edit Details", defaultValues);
    setTypeModalDetailsEdit("Edit deposit accounts");
  };
  return (
    <Box>
      <DataGrid<IDepositAccounts>
        rows={getDepostAccountRows()}
        getRowId={(row) => row.customBambooTalbeRowId}
        columns={employmentStatusColumns}
        pagination
        slots={{
          footer: () => <CustomFooter onAddEmptyRow={addNewRow} />,
        }}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </Box>
  );
};

// ** MUI
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IReimbursement } from "@/const/types";

// ** Columns
import { ColumnsReimbursements } from "./columnsReimbursements";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useHandleDeleteItem } from "@/hooks/useDelete";
import { useHandleAddItem } from "@/hooks/useAddItem";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { CustomFooter } from "@/shared/components/customFooter";
import { useDefaultReimbursement } from "@/hooks/useDefaultData";

export const Reimbursements: React.FC = () => {
  const { handleClickOpenDialog, dataForDialog, setTypeModalDetailsEdit } =
    useModal();
  const { data } = useDataStateContext();
  const defaultValues = useDefaultReimbursement();
  const handleDeleteItem = useHandleDeleteItem();
  const handleAddItem = useHandleAddItem();
  const dialogData = dataForDialog as { eId: number } | null;
  const getReimbursementsRows = (): IReimbursement[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find((emp) => emp.eId === dialogData.eId);
      return employee?.reimbursements || [];
    }
    return [];
  };
  const customIncomeCallbacks: ContextMenuItemsCallbacks<IReimbursement> = {
    openForm: (data) => {
      handleClickOpenDialog("Edit Details", data);
      setTypeModalDetailsEdit("Edit reimbursements");
    },
    addItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: "item",
          eId: dialogData.eId,
          nestedType: "reimbursements",
        });
      }
    },
    deleteItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: "item",
          eId: dialogData.eId,
          nestedType: "reimbursements",
        });
      }
    },
  };

  const CustomIncomeColumns = ColumnsReimbursements(
    customIncomeCallbacks.openForm,
    customIncomeCallbacks
  );
  const addNewRow = () => {
    handleClickOpenDialog("Edit Details", defaultValues);
    setTypeModalDetailsEdit("Edit reimbursements");
  };
  return (
    <Box>
      <DataGrid<IReimbursement>
        rows={getReimbursementsRows()}
        getRowId={(row) => row.customBambooTableRowId}
        columns={CustomIncomeColumns}
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

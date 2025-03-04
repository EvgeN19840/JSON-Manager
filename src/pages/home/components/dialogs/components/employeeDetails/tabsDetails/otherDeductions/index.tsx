// ** MUI
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IOtherDeduction } from "@/const/types";

// ** Columns
import { ColumnsDeductions } from "./columnsDeductions";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useHandleDeleteItem } from "@/hooks/useDelete";
import { useHandleAddItem } from "@/hooks/useAddItem";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { CustomFooter } from "@/shared/components/customFooter";

export const OtherDeductionTab: React.FC = () => {
  const { handleClickOpenDialog, dataForDialog, setTypeModalDetailsEdit } =
    useModal();
  const dialogData = dataForDialog as { eId: number } | null;
  const { data } = useDataStateContext();
  const handleDeleteItem = useHandleDeleteItem();
  const handleAddItem = useHandleAddItem();

  const getDeductionsRows = (): IOtherDeduction[] => {
    if (dataForDialog && dialogData?.eId) {
      const employee = data.employees.find((emp) => emp.eId === dialogData.eId);
      return employee?.otherDeductions || [];
    }
    return [];
  };

  const deductionsCallbacks: ContextMenuItemsCallbacks<IOtherDeduction> = {
    openForm: (data) => {
      handleClickOpenDialog("Edit Details", data);
      setTypeModalDetailsEdit("Edit deductions");
    },
    addItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleAddItem({
          item: data,
          type: "item",
          eId: dialogData.eId,
          nestedType: "otherDeductions",
        });
      }
    },
    deleteItem: (data) => {
      if (dataForDialog && dialogData?.eId) {
        handleDeleteItem({
          id: data.customBambooTableRowId,
          type: "item",
          eId: dialogData.eId,
          nestedType: "otherDeductions",
        });
      }
    },
  };
  const deductionsColumns = ColumnsDeductions(
    deductionsCallbacks.openForm,
    deductionsCallbacks
  );
  const addNewRow = () => {
    handleClickOpenDialog("Edit Details");
    setTypeModalDetailsEdit("Edit deductions");
  };
  return (
    <Box>
      <DataGrid<IOtherDeduction>
        onRowDoubleClick={(params) => deductionsCallbacks.openForm(params.row)}
        rows={getDeductionsRows()}
        getRowId={(row) => row.customBambooTableRowId}
        columns={deductionsColumns}
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

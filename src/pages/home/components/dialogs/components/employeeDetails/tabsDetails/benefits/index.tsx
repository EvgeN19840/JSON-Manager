import { Box } from "@mui/material";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { useModal } from "@/hooks/useModal";
import { IEmployee, IEmployeeBenefit } from "@/const/types";
import { ColumnsBenefit } from "./columnsBenefit";
import { IModalTypeContext } from "@/context/modal/types";
// ** Context
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";

export const BenefitsTab: React.FC = () => {
  const { handleClickOpenDialog } = useModal() as IModalTypeContext;
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployee | null;
  };
  const benefitsData = dataForDialog?.benefits || [];

  const { handleDeleteItem, handleAddItem } = useDataStateContext();

  const rows: GridRowsProp<IEmployeeBenefit> = benefitsData?.map((benefit) => ({
    ...benefit,
  }));

  const handleEditClick = (data: IEmployeeBenefit) => {
    handleClickOpenDialog("Edit Details", data);
  };

  const addItem = (benefit: IEmployeeBenefit) => {
    if (benefit.id && dataForDialog?.eId) {
      handleAddItem(benefit, "item", dataForDialog.eId);
    }
  };

  const deleteItem = (benefit: IEmployeeBenefit) => {
    if (benefit.id && dataForDialog?.eId) {
      handleDeleteItem(benefit.id, "item", dataForDialog.eId);
    }
  };

  const callbacks: ContextMenuItemsCallbacks<IEmployeeBenefit> = {
    openForm: (data) => handleEditClick(data),
    addItem: (data) => addItem(data),
    deleteItem: (data) => deleteItem(data),
  };

  const columns = ColumnsBenefit((benefit) => handleEditClick(benefit), callbacks);

  return (
    <Box>
      {benefitsData && benefitsData.length > 0 ? (
        <DataGrid<IEmployeeBenefit>
          rows={rows}
          columns={columns}    
        />
      ) : null}
    </Box>
  );
};

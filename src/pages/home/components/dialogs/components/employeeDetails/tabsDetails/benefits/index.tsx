// ** React
import { useEffect, useState } from "react";

// ** MUI
import { Box } from "@mui/material";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";

// ** Types
import { IEmployee, IEmployeeBenefit } from "@/const/types";
import { IModalTypeContext } from "@/context/modal/types";

// ** Const
import { ColumnsBenefit } from "./columnsBenefit";

// ** Context
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";

export const BenefitsTab: React.FC = () => {
  const { handleClickOpenDialog } = useModal() as IModalTypeContext;
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployee | null;
  };
  const { handleDeleteItem, handleAddItem } = useDataStateContext();

  const [rows, setRows] = useState<GridRowsProp<IEmployeeBenefit>>([]);
  useEffect(() => {
    if (dataForDialog) {
      setRows(dataForDialog.benefits || []);
    }
  }, [dataForDialog]);

  const handleEditClick = (data: IEmployeeBenefit) => {
    handleClickOpenDialog("Edit Details", data);
  };

  const addItem = (benefit: IEmployeeBenefit) => {
    if (benefit.id && dataForDialog?.eId) {
      handleAddItem(benefit, "item", dataForDialog.eId);
      setRows((prev) => [...prev, benefit]);
    }
  };

  const deleteItem = (benefit: IEmployeeBenefit) => {
    if (benefit.id && dataForDialog?.eId) {
      handleDeleteItem(benefit.id, "item", dataForDialog.eId);
      setRows((prev) => prev.filter((row) => row.id !== benefit.id));
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
     {rows.length > 0 ? (
        <DataGrid<IEmployeeBenefit>
          rows={rows}
          columns={columns}    
        />
      ) : null}
    </Box>
  );
};

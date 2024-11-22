// ** MUI
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useHandleDeleteItem } from "@/hooks/useDelete";

// ** Types
import { IEmployeeBenefit } from "@/const/types";

// ** Const
import { ColumnsBenefit } from "./columnsBenefit";

// ** Context
import { ContextMenuItemsCallbacks } from "@/shared/components/myContextMenu/actionMenu/types";
import { useHandleAddItem } from "@/hooks/useAddItem";
import { IEmployeeDataForDialog } from "@/context/modal/types";

export const BenefitsTab: React.FC = () => {
  const { handleClickOpenDialog, setTypeModalDetailsEdit, dataForDialog } =
    useModal();
    const dialogData = dataForDialog as { eId: number } | null;
  const { data } = useDataStateContext();
  const handleDeleteItem = useHandleDeleteItem();
  const handleAddItem = useHandleAddItem();

  const rows = (() => {
    if (
      dataForDialog &&
      typeof dataForDialog === "object" &&
      dialogData
    ) {
      const employee = data.employees.find(
        (emp) => emp.eId === (dataForDialog as IEmployeeDataForDialog).eId
      );
      return employee?.benefits || [];
    }
    return [];
  })();

  const handleEditClick = (data: IEmployeeBenefit) => {
    handleClickOpenDialog("Edit Details", data);
    setTypeModalDetailsEdit("Edit benefits details");
  };

  const addItem = (benefit: IEmployeeBenefit) => {
    if (dataForDialog && dialogData) {
      handleAddItem({
        item: benefit,
        type: "item",
        eId: dialogData.eId,
        nestedType: "benefits",
      });
    }
  };
  const deleteItem = (item: IEmployeeBenefit) => {
    if (dataForDialog && dialogData) {
      handleDeleteItem({
        id: item.id,
        type: "item",
        eId: (dataForDialog as IEmployeeDataForDialog).eId,
        nestedType: "benefits",
      });
    }
  };

  const callbacks: ContextMenuItemsCallbacks<IEmployeeBenefit> = {
    openForm: (data) => handleEditClick(data),
    addItem: (data) => addItem(data),
    deleteItem: (data) => deleteItem(data),
  };

  const columns = ColumnsBenefit(
    (benefit) => handleEditClick(benefit),
    callbacks
  );

  return (
    <Box>
      <DataGrid<IEmployeeBenefit> rows={rows} columns={columns} />
    </Box>
  );
};

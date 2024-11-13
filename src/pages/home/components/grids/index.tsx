// ** React
import { FC } from "react";

// ** Types
import { IEmployee, ISystemBenefit } from "@/const/types";

// ** Columns
import { ColumnsEmployee, ColumnsBenefit } from "./consts";

// ** Context
import { useDataStateContext } from "@/hooks/useDataStateContext";

// ** Hooks
import { useTabs } from "@/hooks/useTabs";
import { useModal } from "@/hooks/useModal";

// ** Components
import { MyGrid } from "@/shared/components/grid";

export const Grids: FC = () => {
  const { data, handleDeleteItem, handleAddItem } = useDataStateContext();
  const { handleClickOpenDialog } = useModal();
  const { activeTab } = useTabs();

  const deleteItem = (item: IEmployee | ISystemBenefit) => {
    if ("eId" in item) {
      handleDeleteItem(item.eId, "employees");
    } else {
      handleDeleteItem(item.id, "benefits");
    }
  };

  const addItem = (item: IEmployee | ISystemBenefit) => {
    if ("eId" in item) {
      handleAddItem(item, "employees");
    } else {
      handleAddItem(item, "benefits");
    }
  };

  const handleRowDoubleClickOpenDetails = (item: IEmployee) => {
    handleClickOpenDialog(activeTab === "1" ? "Details" : null, item);
  };

  const handleEditDialogOpen = (item: IEmployee| ISystemBenefit) => {
    handleClickOpenDialog(
      activeTab === "1" ? "Edit user" : "Edit benefits",
      item
    );
  };

  const renderGrid = () => {
    switch (activeTab) {
      case "1": {
        const gridData = data.employees;
        const gridColumns = ColumnsEmployee(handleEditDialogOpen, {
          openForm: handleEditDialogOpen,
          deleteItem,
          addItem,
        });

        return (
          <MyGrid<IEmployee>
            data={gridData}
            columns={gridColumns}
            onRowDoubleClick={handleRowDoubleClickOpenDetails}
          />
        );
      }
      case "2": {
        const gridData = data.benefits;
        const gridColumns = ColumnsBenefit(handleEditDialogOpen, {
          openForm: handleEditDialogOpen,
          deleteItem,
          addItem,
        });

        return (
          <MyGrid<ISystemBenefit>
            data={gridData}
            columns={gridColumns}
            onRowDoubleClick={() => {}}
          />
        );
      }
      default:
        return null;
    }
  };

  return renderGrid();
};

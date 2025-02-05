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
import { useHandleAddItem } from "@/hooks/useAddItem";
import { useHandleDeleteItem } from "@/hooks/useDelete";

export const Grids: FC = () => {
  const { data, seteIdSelectedEmployee } = useDataStateContext();
  const { handleClickOpenDialog, setDialogOpen } = useModal();
  const handleAddItem = useHandleAddItem();
  const handleDeleteItem = useHandleDeleteItem();
  const { activeTab } = useTabs();

  const deleteItem = (item: IEmployee | ISystemBenefit) => {
    if ("eId" in item) {
      handleDeleteItem({ id: item.eId, type: "employees" });
    } else {
      handleDeleteItem({ id: item.id, type: "benefits" });
    }
  };

  const addItem = (item: IEmployee | ISystemBenefit) => {
    if ("eId" in item) {
      handleAddItem({ item: item, type: "employees" });
    } else {
      handleAddItem({ item: item, type: "benefits" });
    }
  };

  const handleDuplicate = (employee: IEmployee) => {
    seteIdSelectedEmployee(employee.eId); 
    handleClickOpenDialog("Duplicate", employee);
    setDialogOpen(true);
  };

  const handleRowDoubleClickOpenDetails = (item: IEmployee) => {
    seteIdSelectedEmployee(item.eId);
    handleClickOpenDialog(activeTab === "1" ? "Details" : null, item);
  };

  const handleEditDialogOpen = (item: IEmployee | ISystemBenefit) => {
    handleClickOpenDialog(
      activeTab === "1" ? "Edit user" : "Edit benefits",
      item
    );
  };

  const renderGrid = () => {
    switch (activeTab) {
      case "1": {
        const gridData = data.employees;
        const gridColumns = ColumnsEmployee(
          handleEditDialogOpen,
          {
            openForm: handleEditDialogOpen,
            deleteItem,
            addItem, 
            onDuplicate: handleDuplicate,
          },

        );

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

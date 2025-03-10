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
import {
  saveEmployeeToLocalStorage,
  removeEmployeesFromLocalStorage,
} from "@/services/storageService";
import { useNotification } from "@/hooks/useNotification";


// ** Utils
import { listTemplate } from "@/shared/utils/listTemplate";
import { ColumnsTemplate } from "./consts/columnsTemplate";

export const Grids: FC = () => {
  const { data, seteIdSelectedEmployee } = useDataStateContext();
  const { handleClickOpenDialog, setDialogOpen } = useModal();
  const handleAddItem = useHandleAddItem();
  const handleDeleteItem = useHandleDeleteItem();
  const { showNotification } = useNotification();
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

  const saveLocalStorage = (employee: IEmployee) => {
    const message = saveEmployeeToLocalStorage(employee);

    showNotification(message.text, message.type);

    setDialogOpen(false);
  };
  const removeLocalStore = (employee: IEmployee) => {
    const message = removeEmployeesFromLocalStorage(employee.eId);
    showNotification(message.text, message.type);
    setDialogOpen(false);
    if (employee.firstName !== "John") {
      handleDeleteItem({ id: employee.eId, type: "employees" });
    }
  };

  const handleRowDoubleClickOpenDetails = (item: IEmployee) => {
    seteIdSelectedEmployee(item.eId);
    handleClickOpenDialog(activeTab === "1" || activeTab === "3" ? "Details" : null, item);

  };

  const handleEditDialogOpen = (item: IEmployee | ISystemBenefit) => {
    handleClickOpenDialog(
      activeTab === "1" || activeTab === "3" ? "Details" : "Edit benefits",
      item
    );
  };
  const listTemplateEmployees = listTemplate();

  const renderGrid = () => {
    switch (activeTab) {
      case "1": {
        const gridData = data.employees;
        const gridColumns = ColumnsEmployee(handleEditDialogOpen, {
          openForm: handleRowDoubleClickOpenDetails,
          deleteItem,
          addItem,
          onDuplicate: handleDuplicate,
          saveEmployee: saveLocalStorage,
          removeEmployee: removeLocalStore,
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
      case "3": {
        const gridData = listTemplateEmployees.employees;
        const gridColumns = ColumnsTemplate(handleEditDialogOpen, {
            openForm: handleRowDoubleClickOpenDetails,
            addItem,
            saveEmployee: saveLocalStorage,
            removeEmployee: removeLocalStore,
        }, true);     
        return (
          <MyGrid<IEmployee>
          data={gridData}
          columns={gridColumns}
          onRowDoubleClick={handleRowDoubleClickOpenDetails}
        />
        );
    }
    


      default:
        return null;
    }
  };

  return renderGrid();
};

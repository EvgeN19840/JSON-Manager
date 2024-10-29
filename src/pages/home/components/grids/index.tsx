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

// ** MUI
import { GridRenderCellParams } from "@mui/x-data-grid";

export const Grids: FC = () => {
  const { data, handleDeleteEmployee, handleAddEmployee } = useDataStateContext();
  const { handleClickOpenDialog } = useModal();
  const { activeTab } = useTabs();

  const handleDeleteEmployeeClick = (params: GridRenderCellParams<IEmployee>) => {
    handleDeleteEmployee(params.row.eId);
  };

  const handleAddEmployeeClick = (params: GridRenderCellParams<IEmployee>) => {
    handleAddEmployee(params.row);
  };

  const handleRowDoubleClickOpenDetails = (item: IEmployee | ISystemBenefit) => {
    handleClickOpenDialog(
      activeTab === "1" ? "Details" : "Details benefit data",
      item
    );
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
        const gridColumns = ColumnsEmployee(handleEditDialogOpen, {
          openForm: (params: GridRenderCellParams<IEmployee>) =>
            handleEditDialogOpen(params.row),
          deleteEmployee: handleDeleteEmployeeClick,
          addEmployee: handleAddEmployeeClick,
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
        const gridColumns = ColumnsBenefit(handleEditDialogOpen);

        return (
          <MyGrid<ISystemBenefit>
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

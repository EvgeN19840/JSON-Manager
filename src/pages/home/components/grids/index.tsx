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
import { GridRenderCellParams } from "@mui/x-data-grid";

export const Grids: FC = () => {
  const { data } = useDataStateContext();
  const { handleClickOpenDialog } = useModal();
  const { activeTab } = useTabs();

  const handleEditClick = (item: IEmployee | ISystemBenefit) => {
    if (activeTab === "1") {
      handleClickOpenDialog("Edit user", item);
    } else {
      handleClickOpenDialog("Edit benefits", item);
    }
  };

  const handleDeleteEmployee = (params: GridRenderCellParams<IEmployee>) => {
    const employeeId = params.row.eId;
    console.log("Deleting employee with ID:", employeeId);
  };

  const handleAddEmployee = (params: GridRenderCellParams<IEmployee>) => {
    console.log("Adding employee based on params:", params);
  };

  const handleRowDoubleClick = (item: IEmployee | ISystemBenefit) => {
    if (activeTab === "1") {
      handleClickOpenDialog("Details", item);
    } else {
      handleClickOpenDialog("Details benefit data", item);
    }
  };

  const renderGrid = () => {
    switch (activeTab) {
      case "1": {
        const gridData = data.employees;
        const gridColumns = ColumnsEmployee(handleEditClick, {
          openForm: (params: GridRenderCellParams<IEmployee>) =>
            handleEditClick(params.row),
          deleteEmployee: handleDeleteEmployee,
          addEmployee: handleAddEmployee,
        });

        return (
          <MyGrid<IEmployee>
            data={gridData}
            columns={gridColumns}
            onRowDoubleClick={handleRowDoubleClick}
          />
        );
      }
      case "2": {
        const gridData = data.benefits;
        const gridColumns = ColumnsBenefit(handleEditClick);

        return (
          <MyGrid<ISystemBenefit>
            data={gridData}
            columns={gridColumns}
            onRowDoubleClick={handleRowDoubleClick}
          />
        );
      }
      default:
        return null;
    }
  };

  return renderGrid();
};

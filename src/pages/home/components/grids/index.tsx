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
  const { data } = useDataStateContext();
  const { handleClickOpenDialog, } = useModal();
  const { activeTab } = useTabs();


  const handleEditClick = (item: IEmployee | ISystemBenefit) => {
    if (activeTab === "1") {
      // setSelectedEmployee(item as IEmployee);
      handleClickOpenDialog('Edit user', item)
    } else {
      // setSelectedBenefit(item as ISystemBenefit);
      handleClickOpenDialog('Edit benefits', item)
    }
  };
  const handleRowDoubleClick = (item: IEmployee | ISystemBenefit) => {
    if (activeTab === "1") {
      handleClickOpenDialog( "Details employee data", item); 
    } else {
      handleClickOpenDialog( 'Details benefit data', item); 
    }
  };


  const renderGrid = () => {
    switch (activeTab) {
      case "1": {
        const gridData = data.employees;
        const gridColumns = ColumnsEmployee(handleEditClick)

        return <MyGrid<IEmployee> data={gridData} columns={gridColumns}  onRowDoubleClick={handleRowDoubleClick} />;
      }
      case "2": {
        const gridData = data.benefits;
        const gridColumns = ColumnsBenefit(handleEditClick)

        return (
          <MyGrid<ISystemBenefit> data={gridData} columns={gridColumns}  onRowDoubleClick={handleRowDoubleClick} />
        );
      }
    }
  };

  return renderGrid()
};

import { FC } from "react";
import { Employee, SystemBenefit } from "@/const/types";
import { ColumnsEmployee } from "@/const/columnsEmployee";
import { ColumnsBenefit } from "@/const/columnsBenefit";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useModal } from "@/hooks/useModal";
import { EditDialog } from "@/pages/home/components/editDialog";
import { GridColDef } from "@mui/x-data-grid";
import { useTabs } from "@/hooks/useTabs";
import { MyGrid } from "@/shared/components/grid";

export const Grids: FC = () => {
  const { data, setSelectedEmployee, setSelectedBenefit } =
    useDataStateContext();
  const { setEditDialogOpen } = useModal();
  const { activeTab } = useTabs();

  const handleEditClick = (item: Employee | SystemBenefit) => {
    if (activeTab === "1") {
      setSelectedEmployee(item as Employee);
    } else {
      setSelectedBenefit(item as SystemBenefit);
    }
    setEditDialogOpen(true);
  };

  const renderGrid = () => {
    switch (activeTab) {
      case "1": {
        const gridData = data?.employees as Employee[] | undefined;
        const gridColumns = ColumnsEmployee(
          handleEditClick
        ) as GridColDef<Employee>[];

        return <MyGrid<Employee> data={gridData || []} columns={gridColumns} />;
      }
      case "2": {
        const gridData = data?.benefits as SystemBenefit[] | undefined;
        const gridColumns = ColumnsBenefit(
          handleEditClick
        ) as GridColDef<SystemBenefit>[];

        return (
          <MyGrid<SystemBenefit> data={gridData || []} columns={gridColumns} />
        );
      }
      default:
        return null;
    }
  };

  return (
    <>
      {renderGrid()}
      <EditDialog />
    </>
  );
};

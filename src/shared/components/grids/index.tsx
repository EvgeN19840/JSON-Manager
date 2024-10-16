import { FC, useState, useEffect } from "react";
import { Employee, SystemBenefit } from "@/const/types";
import { ColumnsEmployee } from "@/const/columnsEmployee";
import { ColumnsBenefit } from "@/const/columnsBenefit";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useModal } from "@/hooks/useModal";
import { MyGrid } from "../grid";
import { EditDialog } from "@/pages/home/components/editDialog";
import { GridColDef } from "@mui/x-data-grid";
import { useTabs } from "@/hooks/useTabs";

export const Grids: FC = () => {
  const { data } = useDataStateContext();
  const { setEditDialogOpen } = useModal(); // Используем отдельное состояние для открытия EditDialog
  const { activeTab, handleTabChange } = useTabs();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true); // Открытие EditDialog
  };

  useEffect(() => {
    if (data?.employees && data.employees.length > 0) {
      handleTabChange(null, "1");
    } else if (data?.benefits && data.benefits.length > 0) {
      handleTabChange(null, "2");
    }
  }, [data, handleTabChange]);

  const gridData =
    activeTab === "1"
      ? (data?.employees as Employee[] | undefined)
      : (data?.benefits as SystemBenefit[] | undefined);

  const gridColumns: GridColDef<Employee>[] | GridColDef<SystemBenefit>[] =
    activeTab === "1"
      ? (ColumnsEmployee(handleEditClick) as GridColDef<Employee>[])
      : (ColumnsBenefit(handleEditClick) as GridColDef<SystemBenefit>[]);

  return (
    <>
      {activeTab === "1" ? (
        <MyGrid<Employee>
          data={gridData as Employee[]}
          columns={gridColumns as GridColDef<Employee>[]}
        />
      ) : (
        <MyGrid<SystemBenefit>
          data={gridData as SystemBenefit[]}
          columns={gridColumns as GridColDef<SystemBenefit>[]}
        />
      )}

      {selectedEmployee && <EditDialog employee={selectedEmployee} />}
    </>
  );
};

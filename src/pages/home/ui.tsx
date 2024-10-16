import { FC, useState } from "react";
import { MyGrid } from "./components";
import { EditDialog } from "./components/editDialog";
import { ImportExportDialog } from "./components/importExportDialog";
import { Employee } from "@/const/types";
import { columns } from "@/const/columns";
import { ImportExportButtons } from "@/pages/home/components/importExportButtons";
import { IDialog } from "./components/importExportButtons/types";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { TabsComponent } from "@/shared/components/tabs";
import { useModal } from "@/hooks/useModal";

export const Home: FC = () => {
  const { data, setParsedData } = useDataStateContext();
  const { setDialogOpen, setSource } = useModal();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleClickOpenFromGrid = (actionType: IDialog) => {
    if (actionType === "Export data" && data) {
      setParsedData(JSON.stringify(data, null, 2));
    }
    setDialogOpen(true);
    setSource(actionType);
  };

  return (
    <>
      <TabsComponent />
      <ImportExportButtons handleClickOpenFromGrid={handleClickOpenFromGrid} />

      <MyGrid data={data?.employees} columns={columns(handleEditClick)} />
      {selectedEmployee && <EditDialog employee={selectedEmployee} />}
      <ImportExportDialog />
    </>
  );
};

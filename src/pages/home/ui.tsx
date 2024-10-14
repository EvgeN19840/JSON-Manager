import { FC, useState } from "react";
import { MyGrid } from "./components";
import { EditDialog } from "./components/editDialog";
import { ImportExportDialog } from "./components/importExportDialog";
import { Employee } from "@/const/types";
import { columns } from "@/const/columns";
import { ButtonComponent } from "@/context/buttons/buttonComponent";

import { IDialog } from "./types";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { TabsComponent } from "../../shared/components/tabs";

export const Home: FC = () => {
  const { data, openDialog, setOpenDialog, setParsedData } =
    useDataStateContext();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [source, setSource] = useState<IDialog>(null);

  const hasData = data ? true : false;

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleClickOpenFromGrid = (actionType: IDialog) => {
    if (actionType === "Export data" && data) {
      setParsedData(JSON.stringify(data, null, 2));
    }
    setOpenDialog(true);
    setSource(actionType);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <TabsComponent />
      <ButtonComponent
        handleClickOpenFromGrid={handleClickOpenFromGrid}
        hasData={hasData}
      />

      <MyGrid data={data?.employees} columns={columns(handleEditClick)} />
      {selectedEmployee && (
        <EditDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          employee={selectedEmployee}

        />
      )}

      <ImportExportDialog
        open={openDialog}
        onClose={handleCloseDialog}
        source={source}
      />
    </>
  );
};

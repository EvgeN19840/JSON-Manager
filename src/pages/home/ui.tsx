import { FC, useContext, useState } from "react";
import { MyGrid } from "./components";
import { EditDialog } from "./components/editDialog";
import { ImportExportDialog } from "./components/importExportDialog";
import { Employee, ITypeJSON } from "@/const/types";
import { columns } from "@/const/columns";
import { TabComponent } from "@/context/tabs/tabComponent";
import { DataStateContext } from "@/context/dataState/dataStateContext";
import { IDialog } from "./types";

export const Home: FC = () => {
  const context = useContext(DataStateContext);
  if (!context) {
    throw new Error("DataStateContext must be used within a DataStateProvider");
  }

  const {
    data,
    setData,
    openDialog,
    setOpenDialog,
    parsedData,
    setParsedData,
  } = context;

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

  const handleSave = (updatedEmployee: Employee) => {
    if (data) {
      const updatedData: ITypeJSON = {
        ...data,
        employees: data.employees.map((emp: Employee) =>
          emp.eId === updatedEmployee.eId ? updatedEmployee : emp
        ),
        benefits: data.benefits,
      };

      setData(updatedData);
    } else {
      const newData: ITypeJSON = {
        employees: [updatedEmployee],
        benefits: [],
      };

      setData(newData);
    }
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
      <TabComponent
        handleClickOpenFromGrid={handleClickOpenFromGrid}
        hasData={hasData}
      />

      <MyGrid data={data?.employees} columns={columns(handleEditClick)} />

      {selectedEmployee && (
        <EditDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          employee={selectedEmployee}
          onSave={handleSave}
        />
      )}

      <ImportExportDialog
        setData={setData}
        open={openDialog}
        onClose={handleCloseDialog}
        source={source}
        parsedData={parsedData}
      />
    </>
  );
};

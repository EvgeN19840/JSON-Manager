import { FC, useState } from "react";
import { MyGrid } from "./components";
import { EditDialog } from "./components/editDialog";
import { ImportExportDialog } from "./components/importExportDialog";
import { Employee, ITypeJSON } from "@/const/types";
import { columns } from "@/const/columns";
import { TabComponent } from "@/context/tabs/tabComponent";
import { IDialog } from "./types";

export const Home: FC = () => {
  const [data, setData] = useState<ITypeJSON | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [source, setSource] = useState<IDialog>(null);
  const [parsedData, setParsedData] = useState<string | null>(null);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const hasData = data ? true : false;

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleSave = (updatedEmployee: Employee) => {
    setData((prevData) =>
      prevData
        ? {
            ...prevData,
            employees: prevData.employees.map((emp) =>
              emp.eId === updatedEmployee.eId ? updatedEmployee : emp
            ),
            benefits: prevData.benefits,
          }
        : {
            employees: [updatedEmployee],
            benefits: [],
          }
    );
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

// ** React
import { FC, useState } from "react";

// ** Components
import {
  Header,
  ImportExportDialog,
  MyGrid,
  ToolbarWithExportAndImport,
} from "./components";

// ** Types
import { IDialog } from "./types";
import { Employee, ITypeJSON } from "@/const/types";

// ** Const
import { columns } from "@/const/columns";
import { EditDialog } from "./components/editDialog";


export const Home: FC = () => {
  const [source, setSource] = useState<IDialog>(null);
  const [data, setData] = useState<ITypeJSON | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleSave = (updatedEmployee: Employee) => {
    setData((prevData) => prevData && ({
      ...prevData,
      employees: prevData.employees.map((emp) =>
        emp.eId === updatedEmployee.eId ? updatedEmployee : emp
      ),
    }));
  };
  
  

  const handleClickOpenFromGrid = (actionType: IDialog) => {
    if (actionType === "Export data") {
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
      <Header />
      <MyGrid
        data={data?.employees}
        columns={columns(handleEditClick)}
        slots={{
          toolbar: () => (
            <ToolbarWithExportAndImport
              handleClickOpenFromGrid={handleClickOpenFromGrid}
              hasData={!!data}
            />
          ),
        }}
      />
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

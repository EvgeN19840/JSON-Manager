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
import { ITypeJSON } from "@/const/types";

// ** Const
import { columns } from "@/const/columns";



export const Home: FC = () => {
  const [source, setSource] = useState<IDialog>(null);
  const [data, setData] = useState<ITypeJSON | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<string | null>(null);

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
        columns={columns}
        slots={{
          toolbar: () => (
            <ToolbarWithExportAndImport
              handleClickOpenFromGrid={handleClickOpenFromGrid}
              hasData={!!data}
            />
          ),
        }}
      />
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

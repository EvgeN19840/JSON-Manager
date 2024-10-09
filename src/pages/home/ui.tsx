import { FC, useState } from "react";
import {
  Header,
  ImportExportDialog,
  MyGrid,
  ToolbarWithExportAndImport,
  columns,
} from "./components";
import { ITypeJSON } from "@/const/types";


export const Home: FC = () => {
  const [data, setData] = useState<ITypeJSON | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [source, setSource] = useState("");
  const [parsedData, setParsedData] = useState<string | null>(null);

  const handleClickOpenFromGrid = (actionType: string) => {
    if (actionType === "export") {
      setSource("Export data");
      setParsedData(JSON.stringify(data, null, 2));
    } else {
      setSource("Import data");
    }
    setOpenDialog(true);
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

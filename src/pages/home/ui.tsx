import { FC, useState } from "react";
import { ITypeJSON } from "./const/types";
import { Header, MyGrid } from "./components";
import { OpenDialog } from "./components/import-data/openDialog";

export const Home: FC = () => {
  const [data, setData] = useState<ITypeJSON | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [source, setSource] = useState("");
  const [parsedData, setParsedData] = useState<string | null>(null);

  const handleClickOpenFromGrid = () => {
    setSource("Export data");
    setParsedData(JSON.stringify(data, null, 2));
    setOpenDialog(true);
  };

  const handleClickOpenFromEmployeeData = () => {
    setSource("Import data");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Header />
      <MyGrid data={data} handleClickOpenFromGrid={handleClickOpenFromGrid} />
      <OpenDialog
        setData={setData}
        open={openDialog}
        onOpen={handleClickOpenFromEmployeeData}
        onClose={handleCloseDialog}
        source={source}
        parsedData={parsedData}
      />
    </>
  );
};

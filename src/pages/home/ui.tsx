// ** React
import { FC, useState } from "react";

// ** Types
import { HomeProps } from "./types";
import { ITypeJSON } from "./const/types";

// ** Componets
import { Header, MyGrid } from "./components";
import { Box } from "@mui/material";
import { EmployeeDataButton } from "./components/buttons/emploeeData";
import { Opendialog } from "./components/import-data/openDialog";

export const Home: FC<HomeProps> = (props) => {
  const [data, setData] = useState<ITypeJSON | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fromGrid, setFromGrid] = useState(false);

  const handleClickOpenFromGrid = () => {
    setOpenDialog(true);
    setFromGrid(true);
  };

  const handleOpenForm = () => {
    setOpenDialog(true);
    setFromGrid(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Header {...props} />
      <Box>
        <MyGrid data={data} handleClickOpenFromGrid={handleClickOpenFromGrid} />
      </Box>
      <EmployeeDataButton onClick={handleOpenForm} />
      <Opendialog
        open={openDialog}
        onClose={handleClose}
        fromGrid={fromGrid}
        setData={setData}
      />
    </>
  );
};

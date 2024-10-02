// ** React
import { FC, useState } from "react";

// ** Types
import { HomeProps } from "./types";
import { ITypeJSON } from "./const/types";

// ** Componets
import { Header, ImportData, MyGrid } from "./components";
import { Box } from "@mui/material";

export const Home: FC<HomeProps> = (props) => {
  const [data, setData] = useState<ITypeJSON | null>(null);

  // const handleClose = (
  //   _: React.SyntheticEvent | Event,
  //   reason?: SnackbarCloseReason
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   changeState(setOpen, false);
  // };

  return (
    <>
      <Header {...props} />
      <Box>
        <ImportData setData={setData}/>
        <MyGrid data={data} />
      </Box>
    </>
  );
};

// ** React
import { FC, useState } from "react";

// ** Types
import { HomeProps } from "./types";
import { SnackbarCloseReason } from "@mui/material";

// ** Componets
import { MySnackbar, Header, MyButton, MyGrid } from "./components";
import { rows } from "./components/grid/rows";
import { columns } from "./components/grid/columns";

// ** Module
import { changeState } from "./model";

export const Home: FC<HomeProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    changeState(setOpen, false);
  };

  return (
    <>
      <MyGrid columns={columns} rows={rows} />
      <Header {...props} />
      <MyButton
        handleOpen={() => {
          changeState(setOpen, true);
        }}
      />
      <MySnackbar open={open} title={props.title} handleClose={handleClose} />
    </>
  );
};

// ** React
import { FC, useState } from "react"

// ** Types
import { HomeProps } from './types'
import { SnackbarCloseReason } from "@mui/material";

// ** Componets
import { MySnackbar, Header, MyButton } from "./components";

// ** Module
import { changeState } from "./model";

export const Home: FC<HomeProps> = (props) => {
  const [open, setOpen] = useState(false)

  const handleClose = (_: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    changeState(setOpen, false);
  };


  return (
    <>
      <Header {...props} />
      <MyButton handleOpen={() => { changeState(setOpen, true) }} />
      <MySnackbar
        open={open}
        title={props.title}
        handleClose={handleClose} />
    </>
  )
}


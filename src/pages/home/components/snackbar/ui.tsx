// ** React
import { FC } from "react";

// ** Types
import { Snackbar } from "@mui/material";
import { MySnackbarProps } from "./types";

// ** Styles
import { StylesContentProps } from "./styles/contentProps";

// ** Components
import { MyButton } from "./components/button";

export const MySnackbar: FC<MySnackbarProps> = (props) => (
  <Snackbar
    anchorOrigin={{ vertical: "top", horizontal: "left" }}
    open={props.open}
    autoHideDuration={6000}
    onClose={props.handleClose}
    message={props.title}
    action={<MyButton onClose={props.handleClose}/>}
    ContentProps={{
      sx: StylesContentProps,
    }}
  />
)
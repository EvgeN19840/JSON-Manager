// ** React
import { FC } from "react";

// ** MUI
import { Button, Theme } from "@mui/material";

// ** Types
import { MyButtonProps } from "./types";

export const MyButton: FC<MyButtonProps> = (props) => (
  <Button sx={{
    bgcolor: (theme: Theme) => theme.palette.text.primary,
    color: (theme: Theme) => theme.palette.background.default
  }}
    onClick={props.handleOpen}>
    Open Snackbar
  </Button>
)
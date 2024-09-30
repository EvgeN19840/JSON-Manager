// ** React
import React, { FC } from "react"

// ** MUI
import { IconButton } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';

// ** Types
import { MyButtonProps } from "./types";

export const MyButton: FC<MyButtonProps> = (props) => (
  <React.Fragment>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={props.onClose}
    >
      <CancelIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
)
import React from "react";
import { Snackbar } from "@mui/material";
import { theme } from "@/customTheme";
import { NotificationType } from "../../types";


interface SnackbarComponentProps {
  open: boolean;
  message: string;
  type: NotificationType;
  onClose: () => void;
}

export const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  open,
  message,
  type,
  onClose,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={10000}
    onClose={onClose}
    message={message}
    sx={{
      backgroundColor:
        type === 'success' ? theme.palette.success.main : theme.palette.error.main,
      color: 'white',
    }}
  />
);

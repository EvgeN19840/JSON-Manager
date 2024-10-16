import React from "react";
import { Snackbar, Button } from "@mui/material";
import { theme } from "@/customTheme";
import { INotificationType } from "../types";

interface ISnackbarComponentProps {
  open: boolean;
  message: string;
  type: INotificationType;
  onClose: () => void;
}

export const SnackbarComponent: React.FC<ISnackbarComponentProps> = ({
  open,
  message,
  type,
  onClose,
}) => {
  const action = (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderColor: "white",
          },
        }}
        size="small"
        onClick={onClose}
      >
        close
      </Button>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      action={action}
      autoHideDuration={7000}
      onClose={onClose}
      message={message}
      ClickAwayListenerProps={{ mouseEvent: false }}
      ContentProps={{
        sx: {
          backgroundColor:
            type === "success"
              ? theme.palette.success.main
              : theme.palette.error.main,
          color: "white",
        },
      }}
    />
  );
};

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Snackbar } from "@mui/material";
import { theme } from "@/customTheme";

type SnackbarColor = 'success' | 'error';

interface SnackbarContextProps {
  showSnackbar: (message: string, color: SnackbarColor) => void;

}

const SnackbarContext = createContext<SnackbarContextProps>({
  showSnackbar: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState<SnackbarColor>();

  const showSnackbar = (message: string, color: SnackbarColor) => {
    setMessage(message);
    setSnackbarColor(color)
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        message={message}
        onClick={closeSnackbar}
        sx={{
          backgroundColor: snackbarColor === 'success' ? theme.palette.success.main : theme.palette.error.main,
        }}
      />
    </SnackbarContext.Provider>
  );
};

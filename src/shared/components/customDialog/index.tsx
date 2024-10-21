import { Dialog, Box } from "@mui/material";

interface ICustomDialog {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void
}

export const CustomDialog: React.FC<ICustomDialog> = ({
  children,
  open,
  onClose
}) => {
  return (
    <Dialog onClose={onClose} fullWidth sx={{ height: "100vh" }} open={open} >
      <Box
        sx={{
          p: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Dialog>
  );
};

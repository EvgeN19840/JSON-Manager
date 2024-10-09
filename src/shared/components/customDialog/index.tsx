import { Dialog, Box } from "@mui/material";

interface ICustomDialog {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomDialog: React.FC<ICustomDialog> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog fullWidth sx={{ height: "100vh" }} open={open} onClose={onClose}>
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

// ** MUI
import { Dialog, Box } from "@mui/material";

interface ICustomDialog {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
}

export const CustomDialog: React.FC<ICustomDialog> = ({
  children,
  open,
  onClose,
  maxWidth
}) => {
  return (
    <Dialog  onClose={onClose} fullWidth  maxWidth={maxWidth} open={open} >
      <Box
        sx={{
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

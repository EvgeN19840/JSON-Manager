import { useModal } from "@/hooks/useModal";
import { Dialog, Box } from "@mui/material";

interface ICustomDialog {
  children: React.ReactNode;
}

export const CustomDialog: React.FC<ICustomDialog> = ({
  children,
}) => {
  const { isDialogOpen, setDialogOpen } = useModal()
  return (
    <Dialog fullWidth sx={{ height: "100vh" }} open={isDialogOpen} onClose={() => setDialogOpen(false)}>
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

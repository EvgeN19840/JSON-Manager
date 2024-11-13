// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** MUI
import { Box, Button } from "@mui/material";

// ** Types
import { FormFooterProps } from "./types";

export const FormFooter: React.FC<FormFooterProps> = ({
  cancelButtonText,
  actionButtonText,
  showSecondButton,
  buttonAction,
}) => {
  const { setDialogOpen } = useModal();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

        }}
      >
        <Button variant="outlined" onClick={() => setDialogOpen(false)}>
          {cancelButtonText}
        </Button>

        {showSecondButton ? (
          <Button variant="contained" onClick={buttonAction}>
            {actionButtonText}
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

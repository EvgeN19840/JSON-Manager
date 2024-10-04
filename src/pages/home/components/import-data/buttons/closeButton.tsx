import { Box, Button } from "@mui/material";

interface ICloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<ICloseButtonProps> = ({
  onClick,
}) => {
  return (
    <Box sx={{ display: "flex", mt: 1 }}>
      <Button variant="contained" onClick={onClick}>
       Close
      </Button>
    </Box>
  );
};

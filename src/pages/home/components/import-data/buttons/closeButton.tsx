import { Box, Button } from "@mui/material";

interface ICloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<ICloseButtonProps> = ({
  onClick,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
      <Button variant="outlined" onClick={onClick}>
       Close
      </Button>
    </Box>
  );
};

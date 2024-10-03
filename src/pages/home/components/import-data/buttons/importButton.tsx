import { Box, Button } from "@mui/material";

interface ImportButtonProps {
  onClick: () => void;
}

export const ImportButton: React.FC<ImportButtonProps> = ({ onClick }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
      <Button variant="contained" onClick={onClick}>
        Import
      </Button>
    </Box>
  );
};

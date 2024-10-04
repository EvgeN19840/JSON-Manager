import { Box, Button } from "@mui/material";

interface EmployeeDataButtonProps {
  onClick: () => void;
}

export const SaveDataButton: React.FC<EmployeeDataButtonProps> = ({
  onClick,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
      <Button variant="outlined" onClick={onClick}>
        Save Data
      </Button>
    </Box>
  );
};

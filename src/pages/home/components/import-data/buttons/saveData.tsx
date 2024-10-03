import { Button } from "@mui/material";

interface EmployeeDataButtonProps {
  onClick: () => void;
}

export const SaveDataButton: React.FC<EmployeeDataButtonProps> = ({ onClick }) => {
  return (
    <Button variant="outlined" onClick={onClick} sx={{ m: 1 }}>
      Save Data
    </Button>
  );
};

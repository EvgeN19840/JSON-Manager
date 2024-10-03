import { Button } from "@mui/material";

interface EmployeeDataButtonProps {
  onClick: () => void;
}

export const EmployeeDataButton: React.FC<EmployeeDataButtonProps> = ({
  onClick,
}) => {
  return (
    <Button variant="outlined" onClick={onClick} sx={{ m: 1 }}>
      Employee Data
    </Button>
  );
};

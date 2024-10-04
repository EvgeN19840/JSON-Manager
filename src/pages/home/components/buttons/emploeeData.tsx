import { Button } from "@mui/material";

interface IEmployeeDataButtonProps {
  onClick: () => void;
}

export const EmployeeDataButton: React.FC<IEmployeeDataButtonProps> = ({
  onClick,
}) => {
  return (
    <Button variant="contained" onClick={onClick} sx={{ m: 1 }}>
     Import Employee Data
    </Button>
  );
};

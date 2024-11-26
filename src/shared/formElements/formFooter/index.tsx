import { useModal } from "@/hooks/useModal";

// ** MUI
import { Box, Button } from "@mui/material";

// ** Types
import { FormFooterProps } from "./types";
import { useDataStateContext } from "@/hooks/useDataStateContext";

export const FormFooter: React.FC<FormFooterProps> = ({
  cancelButtonText,
  actionButtonText,
  canAddBaseEmployee,
  showSecondButton,
  addBaseEmployee,
  buttonAction,
  source,
}) => {
  const { setDialogOpen, handleClickOpenDialog } = useModal();

  const { data, eIdSetectedEmploee } = useDataStateContext();
  const handleCancel = () => {
    if (source === "employeeDetails") {
      const updatedEmployee = data.employees.find(
        (employee) => employee.eId === eIdSetectedEmploee
      );

      setDialogOpen(false);
      handleClickOpenDialog("Details", updatedEmployee);
    } else {
      setDialogOpen(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" onClick={handleCancel}>
          {cancelButtonText}
        </Button>

        <Button
          variant="contained"
          onClick={addBaseEmployee}
          disabled={!canAddBaseEmployee}
        >
         Add Base Employee
        </Button>
        <Button
          variant="contained"
          onClick={buttonAction}
          disabled={!showSecondButton}
        >
          {actionButtonText}
        </Button>
      </Box>
    </Box>
  );
};

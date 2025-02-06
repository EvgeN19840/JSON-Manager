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

  const { data, eIdSelectedEmployee, setCountDuplicates } =
    useDataStateContext();
  const handleCancel = () => {
    if (source === "employeeDetails") {
      const updatedEmployee = data.employees.find(
        (employee) => employee.eId === eIdSelectedEmployee
      );

      setDialogOpen(false);
      handleClickOpenDialog("Details", updatedEmployee);
    } else {
      setDialogOpen(false);
      if (source === "duplicate") {
        setCountDuplicates("1");
      }
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        zIndex: 1,
        backgroundColor: "white",
        p: "1rem",
      }}
    >
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

        {canAddBaseEmployee && (
          <Button variant="contained" onClick={addBaseEmployee}>
            Add Base Employee
          </Button>
        )}
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

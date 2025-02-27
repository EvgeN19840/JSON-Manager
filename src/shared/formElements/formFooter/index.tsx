import { useModal } from "@/hooks/useModal";

// ** MUI
import { Box, Button } from "@mui/material";

// ** Types
import { FormFooterProps } from "./types";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { InputField } from "@/shared/inputField";
import { useState } from "react";

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

  const [inputNameFile, setInputNameFile] = useState("");

  const handleNameFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameFile(event.target.value);
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
          <Box
            sx={{ display: "flex", alignItems: "center", gap: "1rem", m: 1 }}
          >
            <Button variant="contained" onClick={addBaseEmployee}>
              Add Base Employee
            </Button>
            <InputField
              value={inputNameFile}
              placeholder="Name template"
              onChange={handleNameFileChange}
              sx={{
                width: 150,
              }}
              slotProps={{
                input: {
                  sx: {
                    padding: 1,
                  },
                },
              }}
            />
          </Box>
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

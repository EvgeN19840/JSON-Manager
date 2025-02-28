import { useModal } from "@/hooks/useModal";
import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import { FormFooterProps } from "./types";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { listTemplate } from "@/shared/utils/listTemplate";
import { Controller, useForm } from "react-hook-form";
import { IEmployee } from "@/const/types";

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
  const { data, eIdSelectedEmployee, setCountDuplicates } = useDataStateContext();
  const { control, watch } = useForm<IEmployee>({
    mode: "onSubmit",
  });
  const selectedName = watch("firstName");
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="outlined" onClick={handleCancel}>
          {cancelButtonText}
        </Button>

        {canAddBaseEmployee && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", m: 1 }}>
            {addBaseEmployee && (
              <Button
                variant="contained"
                onClick={() => addBaseEmployee(selectedName)}
              >
                Add Base Employee
              </Button>
            )}

            <FormControl fullWidth variant="outlined">
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {listTemplate().employees.map((emp, index) => (
                      <MenuItem key={index} value={emp.firstName}>
                        {emp.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
        )}
        <Button variant="contained" onClick={buttonAction} disabled={!showSecondButton}>
          {actionButtonText}
        </Button>
      </Box>
    </Box>
  );
};

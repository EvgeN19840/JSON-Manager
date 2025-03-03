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
  const { data, eIdSelectedEmployee, setCountDuplicates } =
    useDataStateContext();
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
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
              alignItems: "center",
              mx:2
            }}
          >
            {addBaseEmployee && (
              <Button
                variant="contained"
                onClick={() => addBaseEmployee(selectedName)}
                sx={{ height: "40px"}}
              >
                Add Base Employee
              </Button>
            )}
            <Box />
            <FormControl sx={{ minWidth: "160px" }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    sx={{ height: "40px" }}
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

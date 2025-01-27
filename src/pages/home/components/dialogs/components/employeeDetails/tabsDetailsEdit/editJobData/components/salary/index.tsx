import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "@/hooks/useModal";
import { useDefaultSalary } from "@/hooks/useDefaultData";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";
import payPeriod from "./payPiriodDropdown";
import { ISalary } from "@/const/types";

import { salarySchema } from "../../schema";

export const Salary: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: ISalary | null;
  };
  const defaultValues = useDefaultSalary();

  const { handleClickOpenDialog } = useModal();
  const { handleSaveData, data, eIdSetectedEmploee } = useDataStateContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ISalary>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(salarySchema),
  });

  const onSubmit = (formData: ISalary) => {
    handleSaveData({ ...dataForDialog, ...formData } as ISalary, "salary");
    const updatedEmployees = data.employees.map((employee) =>
      employee.eId === eIdSetectedEmploee
        ? { ...employee, ...formData }
        : employee
    );

    const updatedEmployee = updatedEmployees.find(
      (employee) => employee.eId === eIdSetectedEmploee
    );
    handleClickOpenDialog("Details", updatedEmployee);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <FormWrapper title="Salary" onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter((key) => key !== "customBambooTableRowId")
          .map((key) => (
            <Box key={key} mb={2}>
              {key === "payPeriod" ? (
                <FormControl fullWidth variant="outlined">
                  <InputLabel>{key}</InputLabel>
                  <Controller
                    name="payPeriod"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label={key}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {payPeriod.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              ) : (
                <FormInput
                  name={key as keyof ISalary}
                  label={key}
                  control={control}
                  type={
                    typeof defaultValues[key as keyof ISalary] === "boolean"
                      ? "checkbox"
                      : "text"
                  }
                  errorMessage={errors[key as keyof ISalary]?.message}
                />
              )}
            </Box>
          ))}
      </FormWrapper>
      <FormFooter
        cancelButtonText="Cancel"
        actionButtonText="Save"
        showSecondButton={isDirty}
        buttonAction={handleSubmit(onSubmit)}
        source="employeeDetails"
      />
    </Box>
  );
};

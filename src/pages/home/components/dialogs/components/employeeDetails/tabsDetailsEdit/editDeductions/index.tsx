import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";
import { IOtherDeduction } from "@/const/types";
import { useDefaultOtherDeduction } from "@/hooks/useDefaultData";
import { schema } from "./schema";

export const EditDeductions: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IOtherDeduction | null;
  };
  const defaultValues = useDefaultOtherDeduction();

  const { handleClickOpenDialog } = useModal();
  const { handleSaveData, data, eIdSetectedEmploee } = useDataStateContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IOtherDeduction>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: IOtherDeduction) => {
    handleSaveData(
      { ...dataForDialog, ...formData } as IOtherDeduction,
      "otherDeductions"
    );
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
      <FormWrapper title="Deduction" onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter((key) => key !== "customBambooTableRowId")
          .map((key) => (
            <Box key={key} mb={2}>
              <FormInput
                name={key as keyof IOtherDeduction}
                label={key}
                control={control}
                errorMessage={errors[key as keyof IOtherDeduction]?.message}
              />
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

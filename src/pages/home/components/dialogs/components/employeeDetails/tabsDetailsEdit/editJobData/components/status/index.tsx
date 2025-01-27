import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";
import { IEmploymentStatus } from "@/const/types";
import { employmentStatusSchema } from "../../schema";
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useDefaultEmploymentStatus } from "@/hooks/useDefaultData";

export const EmploymentStatus: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmploymentStatus | null;
  };
  const defaultValues = useDefaultEmploymentStatus();

  const { handleClickOpenDialog } = useModal();
  const { handleSaveData, data, eIdSetectedEmploee } = useDataStateContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IEmploymentStatus>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(employmentStatusSchema),
  });

  const onSubmit = (formData: IEmploymentStatus) => {
    handleSaveData(
      { ...dataForDialog, ...formData } as IEmploymentStatus,
      "status"
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
      <FormWrapper title="Employment Status" onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter((key) => key !== "customBambooTableRowId")
          .map((key) => (
            <Box key={key} mb={2}>
              <FormInput
                name={key as keyof IEmploymentStatus}
                label={key}
                control={control}
                errorMessage={errors[key as keyof IEmploymentStatus]?.message}
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

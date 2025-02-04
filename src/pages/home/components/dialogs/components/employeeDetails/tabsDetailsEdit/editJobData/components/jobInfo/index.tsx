import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";
import { IJobInfo } from "@/const/types";

import { jobInfoSchema } from "../../schema";
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useDefaultJobInfo } from "@/hooks/useDefaultData";

export const JobInfo: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IJobInfo | null;
  };
  const { handleClickOpenDialog } = useModal();
  const defaultValues = useDefaultJobInfo();
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IJobInfo>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(jobInfoSchema),
  });

  const onSubmit = (formData: IJobInfo) => {
    handleSaveData({ ...dataForDialog, ...formData } as IJobInfo, "jobInfo");
    const updatedEmployees = data.employees.map((employee) =>
      employee.eId === eIdSelectedEmployee
        ? { ...employee, ...formData }
        : employee
    );

    const updatedEmployee = updatedEmployees.find(
      (employee) => employee.eId === eIdSelectedEmployee
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
      <FormWrapper title="Job Info" onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter((key) => key !== "customBambooTableRowId")
          .map((key) => (
            <Box key={key} mb={2}>
              <FormInput
                name={key as keyof IJobInfo}
                label={key}
                control={control}
                errorMessage={errors[key as keyof IJobInfo]?.message}
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

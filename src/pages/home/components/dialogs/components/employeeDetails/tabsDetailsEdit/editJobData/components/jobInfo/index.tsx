import { Box, Typography } from "@mui/material";
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
  const { handleSaveData, data, eIdSetectedEmploee } = useDataStateContext();

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
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" mt={4} mb={1}>
        Job Info
      </Typography>
      {Object.keys(defaultValues).map((key) => (
        <Box key={key} mb={2}>
          <FormInput
            name={key as keyof IJobInfo}
            label={key}
            control={control}
            errorMessage={errors[key as keyof IJobInfo]?.message}
          />
        </Box>
      ))}
      <FormFooter
        cancelButtonText="Cancel"
        actionButtonText="Save"
        showSecondButton={isDirty}
        buttonAction={handleSubmit(onSubmit)}
        source="employeeDetails"
      />
    </FormWrapper>
  );
};

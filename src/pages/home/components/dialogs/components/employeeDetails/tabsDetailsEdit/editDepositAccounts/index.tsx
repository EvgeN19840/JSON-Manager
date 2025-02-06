import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";
import { IDepositAccounts } from "@/const/types";
import { schema } from "./schema";
import { useDefaultDepositAccounts } from "@/hooks/useDefaultData";

export const EditDepositAccounts: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IDepositAccounts | null;
  };
  const defaultValues = useDefaultDepositAccounts();

  const { handleClickOpenDialog } = useModal();
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IDepositAccounts>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: IDepositAccounts) => {
    handleSaveData(
      { ...dataForDialog, ...formData } as IDepositAccounts,
      "depositAccount"
    );
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
    <Box>
      <FormWrapper title="Deposit account" onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter((key) => key !== "customBambooTableRowId")
          .map((key) => (
            <Box key={key} mb={2}>
              <FormInput
                name={key as keyof IDepositAccounts}
                label={key}
                control={control}
                type={
                  typeof defaultValues[key as keyof IDepositAccounts] ===
                  "boolean"
                    ? "checkbox"
                    : "text"
                }
                errorMessage={errors[key as keyof IDepositAccounts]?.message}
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

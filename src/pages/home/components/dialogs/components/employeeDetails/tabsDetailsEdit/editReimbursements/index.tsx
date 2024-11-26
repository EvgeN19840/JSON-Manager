// ** MUI
import { Box } from "@mui/material";

// ** Forms Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";
import { useDefaultReimbursement } from "@/hooks/useDefaultData";

// ** Schema
import { schema } from "./schema";

// ** Types
import { IReimbursement } from "@/const/types";

// ** Components
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";

export const EditPersonalTab: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IReimbursement | null;
  };

  const { handleClickOpenDialog } = useModal();
  const { handleSaveData, data, eIdSetectedEmploee } = useDataStateContext();

  const defaultValues = useDefaultReimbursement();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IReimbursement>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: IReimbursement) => {
    handleSaveData(
      { ...dataForDialog, ...formData } as IReimbursement,
      "personal"
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
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(defaultValues).map((key) => (
        <Box key={key}>
          <FormInput
            name={key as keyof IReimbursement}
            label={key.replace(/([A-Z])/g, " $1")}
            control={control}
            errorMessage={errors[key as keyof IReimbursement]?.message}
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

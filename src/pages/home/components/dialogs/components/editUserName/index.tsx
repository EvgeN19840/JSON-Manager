// ** Components
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";

// ** Forms Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";

// ** Schema
import { schema } from "./schema";

// ** Types
import { IEmployee } from "@/const/types";
import { IFormProps } from "./types";
import { Box } from "@mui/material";

export const EditUserName = () => {
  const { dataForDialog, closeDialog } = useModal() as {
    dataForDialog: IEmployee | null;
    closeDialog: () => void;
  };
  const { handleSaveEmployee } = useDataStateContext();
  const defaultValues = {
    firstName: (dataForDialog as IEmployee).firstName,
    lastName: (dataForDialog as IEmployee).lastName,
    eId: (dataForDialog as IEmployee).eId,
    birthDate: dataForDialog?.birthDate
      ? dataForDialog.birthDate.split("T")[0]
      : "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormProps>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormProps) => {
    handleSaveEmployee({
      ...(dataForDialog as IEmployee),
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
    } as IEmployee);
    closeDialog();
  };

  return (
    <FormWrapper title="Employee" onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(defaultValues).map((key) => (
        <Box key={key} mb={2}>
          <FormInput
            name={key as keyof IFormProps}
            label={key}
            control={control}
            type={
              typeof defaultValues[key as keyof IFormProps] === "boolean"
                ? "checkbox"
                : "text"
            }
            errorMessage={errors[key as keyof IFormProps]?.message}
          />
        </Box>
      ))}
      <FormFooter
        cancelButtonText="Cancel"
        actionButtonText="Save"
        showSecondButton={isDirty}
        buttonAction={handleSubmit(onSubmit)}
        source={"general"}
      />
    </FormWrapper>
  );
};

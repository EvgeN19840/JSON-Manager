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

//** Utils
import { generateErrorMessage } from "@/shared/utils/generateErrorMessage";

export const EditUserName = () => {
  const { dataForDialog, closeDialog } = useModal();
  const { handleSaveEmployee } = useDataStateContext();
  const defaultValues = {
    firstName: (dataForDialog as IEmployee).firstName,
    lastName: (dataForDialog as IEmployee).lastName,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
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
    } as IEmployee);
    closeDialog();
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="firstName"
        label="First Name"
        control={control}
        errorMessage={
          errors.firstName
            ? generateErrorMessage("First Name", errors.firstName.type)
            : ""
        }
        rules={{ required: true }}
      />
      <FormInput
        name="lastName"
        label="Last Name"
        control={control}
        rules={{ required: true }}
        errorMessage={
          errors.lastName
            ? generateErrorMessage("Last Name", errors.lastName.type)
            : ""
        }
      />
      <FormFooter
        cancelButtonText={"Cancel"}
        actionButtonText={"Save"}
        showSecondButton={true}
        buttonAction={handleSubmit(onSubmit)}
      />
    </FormWrapper>
  );
};

// ** Components
import { FormInput } from "@/shared/formInput";
import { FormFooter } from "@/shared/formFooter";
import { FormWrapper } from "@/shared/formWrapper";

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
    <FormWrapper<IFormProps> onSubmit={onSubmit}>
      <FormInput
        name="firstName"
        label="First Name"
        control={control}
        errorMessage={errors.firstName?.message}
        rules={{ required: true }}
      />
      <FormInput
        name="lastName"
        label="Last Name"
        control={control}
        errorMessage={errors.lastName?.message}
        rules={{ required: true }}
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

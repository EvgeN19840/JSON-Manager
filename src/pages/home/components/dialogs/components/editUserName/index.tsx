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

export const EditUserName = () => {
  const { dataForDialog, closeDialog } = useModal();
  const { handleSaveEmployee } = useDataStateContext();
  const defaultValues = {
    firstName: (dataForDialog as IEmployee).firstName,
    lastName: (dataForDialog as IEmployee).lastName,
    eId: (dataForDialog as IEmployee).eId,
    birthDate: (dataForDialog as IEmployee).birthDate 
      ? (dataForDialog as IEmployee).birthDate.split('T')[0]
      : '',
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
      birthDate: data.birthDate
    } as IEmployee);
    closeDialog();

  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
        rules={{ required: true }}
        errorMessage={errors.lastName?.message}
      />
      <FormInput
        name="birthDate"
        label="Birth date"
        control={control}
        rules={{ required: true }}
        errorMessage={errors.birthDate?.message}
      />
      <FormInput
        name="eId"
        label="ID"
        control={control}
        errorMessage={errors.eId?.message}
        rules={{ required: true }}
        disabled
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

// ** Components
import { FormWrapper, FormInput, FormFooter } from "@/shared/formElements";

// ** Forms Imports
import { useForm,  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Schema
import { schema } from "./schema";

// ** Hooks
import { useModal } from "@/hooks/useModal";
import { useDataStateContext } from "@/hooks/useDataStateContext";

// ** Types
import { ISystemBenefit } from "@/const/types";
import { IFormBenefitsProps } from "./types";


export const EditBenefits = () => {
  const { dataForDialog, closeDialog } = useModal();
  const { handleSaveBenefit } = useDataStateContext();
  const defaultValues = {
    name: (dataForDialog as ISystemBenefit).name,
    id: (dataForDialog as ISystemBenefit).id,
  };

  const {

    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormBenefitsProps>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormBenefitsProps) => {
    handleSaveBenefit({
      ...(dataForDialog as ISystemBenefit),
      id: data.id,
      name: data.name,
    } as ISystemBenefit);
    closeDialog();
  };

  return (
    <FormWrapper<IFormBenefitsProps> onSubmit={onSubmit}>
      <FormInput
        name="name"
        label="Benefit name"
        control={control}
        errorMessage={errors.name?.message}
        rules={{ required: true }}
      />
      <FormInput
        name="id"
        label="ID"
        control={control}
        errorMessage={errors.id?.message}
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
